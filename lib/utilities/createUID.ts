export function createUID() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return 'b' + timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};