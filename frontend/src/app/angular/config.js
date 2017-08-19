
config.$inject = ["$compileProvider"];
export default function config($compileProvider) {
    $compileProvider.debugInfoEnabled(true);
}