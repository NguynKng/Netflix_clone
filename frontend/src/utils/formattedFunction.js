export function formatReleaseDate(date) {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export function formatDateTime(dateString) {
	// Create a Date object from the input date string
	const date = new Date(dateString);

	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	// Extract the month, day, and year from the Date object
	const month = monthNames[date.getUTCMonth()];
	const day = date.getUTCDate();
	const year = date.getUTCFullYear();
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()

	// Return the formatted date string
	return `${month} ${day}, ${year} | ${hours}:${minutes.toString().length === 2 ? minutes : "0"+minutes}`;
}

export function formattedRunTime(minutes) {
    const second = minutes * 60;
    const hours = Math.floor(second / 3600);
    const minutesRemaining = Math.floor((second % 3600) / 60);

    return `${hours > 0 ? `${hours}h ${minutesRemaining.toString().padStart(2, '0')}m` : `${minutesRemaining}m`}`;
}