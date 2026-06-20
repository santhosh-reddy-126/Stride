export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getCurrentDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function localDateTimeToDate(arr) {
  if (!Array.isArray(arr) || arr.length < 6) return null;
  return new Date(
    arr[0],
    arr[1] - 1,
    arr[2],
    arr[3],
    arr[4],
    arr[5],
    arr[6] ? Math.floor(arr[6] / 1000000) : 0
  );
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatLocalDateTime(arr) {
  if (!Array.isArray(arr) || arr.length < 5) return null;
  const day = arr[2];
  const month = MONTHS[arr[1] - 1];
  const year = arr[0];
  const hours = arr[3];
  const minutes = String(arr[4]).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 || 12;
  return `${day} ${month} ${year} \u2022 ${h12}:${minutes} ${ampm}`;
}

export function isOverdue(arr, taskStatus) {
  if (taskStatus === 'COMPLETED') return false;
  if (!Array.isArray(arr)) return false;
  const date = localDateTimeToDate(arr);
  if (!date || isNaN(date.getTime())) return false;
  const now = new Date();
  date.setSeconds(0, 0);
  now.setSeconds(0, 0);
  return date < now;
}

export function isToday(arr) {
  if (!Array.isArray(arr) || arr.length < 3) return false;
  const now = new Date();
  return (
    arr[0] === now.getFullYear() &&
    arr[1] === now.getMonth() + 1 &&
    arr[2] === now.getDate()
  );
}

export function isTomorrow(arr) {
  if (!Array.isArray(arr) || arr.length < 3) return false;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    arr[0] === tomorrow.getFullYear() &&
    arr[1] === tomorrow.getMonth() + 1 &&
    arr[2] === tomorrow.getDate()
  );
}

function formatTimeStr(hours, minutes) {
  const h = String(hours).padStart(2, '0');
  const m = String(minutes).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

export function formatDueDateLabel(arr, taskStatus) {
  if (!Array.isArray(arr) || arr.length < 5) return null;
  if (taskStatus === 'COMPLETED') {
    return `Due: ${formatLocalDateTime(arr)}`;
  }
  const timeStr = formatTimeStr(arr[3], arr[4]);
  if (isOverdue(arr, taskStatus)) {
    return `\uD83D\uDD34 Overdue \u2022 ${formatLocalDateTime(arr)}`;
  }
  if (isToday(arr)) {
    return `\uD83D\uDFE1 Today \u2022 ${timeStr}`;
  }
  if (isTomorrow(arr)) {
    return `\uD83D\uDFE2 Tomorrow \u2022 ${timeStr}`;
  }
  return `Due ${formatLocalDateTime(arr)}`;
}

export function arrayToDatetimeLocalValue(arr) {
  if (!Array.isArray(arr) || arr.length < 5) return '';
  const y = String(arr[0]).padStart(4, '0');
  const M = String(arr[1]).padStart(2, '0');
  const d = String(arr[2]).padStart(2, '0');
  const h = String(arr[3]).padStart(2, '0');
  const m = String(arr[4]).padStart(2, '0');
  return `${y}-${M}-${d}T${h}:${m}`;
}

export function datetimeLocalToArray(value) {
  if (!value) return null;
  const parts = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  if (!parts) return null;
  return [
    parseInt(parts[1], 10),
    parseInt(parts[2], 10),
    parseInt(parts[3], 10),
    parseInt(parts[4], 10),
    parseInt(parts[5], 10),
    0,
    0,
  ];
}
