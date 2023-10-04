
export default function timeToLocalTime(date: string) {
    return `${new Date(date).toDateString()} at ${new Date(date).toLocaleTimeString()}`
}
