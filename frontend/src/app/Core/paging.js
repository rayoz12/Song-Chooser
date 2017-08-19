/**
 * Created by Ryan on 27/07/2017.
 */
class Paging {
    constructor(onSizeChanged, onPageChanged, orderBy, paginationMeta = {}, currentPage = 1, limit = 10, offset = 0, paginationOptions = [10,20,30,50,100,200,1500, "View All"]) {
        this.onSizeChanged = onSizeChanged;
        this.onPageChanged = onPageChanged;
        this.orderBy = orderBy;
        this.currentPage = currentPage;
        this.limit = limit;
        this.offset = offset;
        this.paginationOptions = paginationOptions;
        this.paginationMeta = paginationMeta;
    }

    sizeChanged() {
        let limit, offset, orderBy;
        if (this.limit === "View All") {
            limit = null;
            offset = null;
            orderBy = null;
        } else {
            limit = this.limit;
            offset = this.offset;
            orderBy = this.orderBy;
        }
        this.onSizeChanged({orderBy, limit, offset});
    }

    pageChanged() {
        this.offset = (this.currentPage * this.limit) - this.limit;
        this.onPageChanged({orderBy: this.orderBy, limit: this.limit, offset: this.offset});
    }
}

export default Paging;