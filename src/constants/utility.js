export const formatTimeUTC = (dateString) => {
  if (!dateString) return '';

  return new Date(dateString).toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};