const request = require("request");

class SMSBroadcast {
    /**
     * SMSBroadcast constructor
     * @param {string} username The username for the account registered on SMS Broadcast
     * @param {string} password The password for the account on SMS broadcast
     */
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.APIURL = {
            API: "https://api.smsbroadcast.com.au/api-adv.php",
        }
    }
    /**
     * Get the number of credits left in your account.
     * @returns {Promise<string>} The number of credits left
     */
    getBalance() {
        return new Promise((resolve, reject) => {
            request.post({
                headers: { 'content-type': "application/x-www-form-urlencoded" },
                url: this.APIURL.API,
                body: `action=balance&username=${this.username}&password=${this.password}`
            }, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                const result = body.split(":");
                if (result[0] === "ERROR") {
                    reject(new Error(result[1]));
                } else {
                    resolve(parseInt(result[1]));
                }
            });
        });
    }

    /**
     * Send a single message to multiple numbers.
     * @param {string} message The message to send to the numbers
     * @param {number|string|string[]} to The receiving mobile number(s). The numbers can be in the format:04xxxxxxxx (Australian format), 614xxxxxxxx  (International format without a preceding +), 4xxxxxxxx (missing leading 0)
     * We recommend using the international format, but your messages will be accepted in any of the above formats.
     * @param {string} [from=OzEducation] The sender ID for the messages. Can be a mobile number or letters, up to 11 characters and should not contain punctuation or spaces.
     * @param {string} [ref=null] Your reference number for the message to help you track the message status. This parameter is optional and can be up to 20 characters.
     * @param {string|number} [maxsplit=5] Determines the maximum length of your SMS message
     * @param {string|number} [delay=0] Number of minutes to delay the message. Use this to schedule messages for later delivery.
     * @param {function(err, result)} cb The callback after the response is recieved.
     * @returns {} 
     */
    sendSMSMessages(message, to, from="OzEducation", ref=null, maxsplit=5, delay=0) {
        let requestBody = `username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}&message=${encodeURIComponent(message)}&from=${encodeURIComponent(from)}&maxsplit=${maxsplit}&delay=${delay}`;
        if (ref !== null) {
            requestBody += `&ref=${ref}`;
        }
        if (from.length > 11) {
            // ReSharper disable once AssignedValueIsNeverUsed
            // sorry for reassigning paramters but we must truncate before seding request.
            from = from.slice(0, 11);
            console.warn("[SMS] The from field is longer than 11 characters, it will be truncated to", from);
        }
        let toStr;
        if (typeof to === "string")
            toStr = to;
        else if (typeof to === "number")
            toStr = parseInt(to, 10);
        else
            toStr = to.join(",");

        requestBody += "&to=" + toStr;
        return new Promise((resolve, reject) => {
            request.post({
                headers: { 'content-type': "application/x-www-form-urlencoded" },
                url: this.APIURL.API,
                body: requestBody
            },
            function(error, response, body) {
                if (error) {
                    reject(error);
                }
                const responseSplit = body.split("\n");
                const result = responseSplit[0].split(":");
                if (result[0] === "ERROR") {
                    //flat out error no messages sent
                    reject(new Error(result[1]));
                } else {
                    //success
                    const responseArr = responseSplit.map(item => {
                        const itemResult = item.split(":");
                        return {
                            status: itemResult[0],
                            number: itemResult[1],
                            refOrError: itemResult[2]
                        }
                    });
                    resolve(responseArr);
                }
            });
        });
    }
}

module.exports = SMSBroadcast;