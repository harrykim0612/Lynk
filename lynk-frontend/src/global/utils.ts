const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDatetime(datetime:Date) {
    const date = new Date(datetime);
    const day = ('0' + date.getDate()).slice(-2);
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    const formattedDate = month+" "+day+", "+year+" at "+ hours+":"+minutes;
    return formattedDate
}

export function formatDate(datetime:Date) {
    const date = new Date(datetime);
    const day = ('0' + date.getDate()).slice(-2);
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const formattedDate = month+" "+day+", "+year;
    return formattedDate
}