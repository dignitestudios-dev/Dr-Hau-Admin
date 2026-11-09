export const formatTimeUTC = (dateString) => {
  if (!dateString) return '';

  return new Date(dateString).toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatEventTime = (dateString) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const validateLotNumber = (lotNumber) => {
  if (!lotNumber || !lotNumber.toString().trim()) {
    return "Lot number is required.";
  }
  const trimmed = lotNumber.toString().trim();
  if (trimmed.length < 3) {
    return "Lot number must be at least 3 characters.";
  }
  if (trimmed.length > 20) {
    return "Lot number must not exceed 20 characters.";
  }
  // Reject unsupported symbols such as @ # $ % ^ & * ( ) !
  if (/[@#$%^&*()!]/.test(trimmed)) {
    return "Lot number contains unsupported symbols (@, #, $, %, ^, &, *, (, ), !).";
  }
  // Reject emojis and non-ASCII characters
  if (!/^[\x20-\x7E]+$/.test(trimmed) || /[\uD800-\uDFFF]/.test(trimmed)) {
    return "Lot number cannot contain emojis or non-ASCII characters.";
  }
  return null;
};

export const normalizeVaccineName = (name) => {
  if (!name) return "";
  const cleaned = name.toLowerCase().replace(/[\s\-_]/g, "");
  if (cleaned.includes("flu") || cleaned.includes("influenza")) return "Flu";
  if (cleaned.includes("tdap")) return "Tdap";
  if (cleaned.includes("tdvaccine") || cleaned === "td") return "TD Vaccine";
  if (cleaned.includes("hepb") || cleaned.includes("hepatitisb")) return "Hepatitis B";
  if (cleaned.includes("mmr")) return "MMR";
  if (cleaned.includes("varicella")) return "Varicella";
  if (cleaned.includes("rabies")) return "Rabies";
  return name.trim();
};

/**
 * Bug-015: Strictly format Date of Birth to MM/DD/YYYY with leading zeros
 */
export const formatDOB = (dob) => {
  if (!dob) return "N/A";
  try {
    if (typeof dob === "string") {
      const cleanDob = dob.trim();
      // Handle YYYY-MM-DD or YYYY-M-D
      if (/^\d{4}-\d{1,2}-\d{1,2}/.test(cleanDob)) {
        const parts = cleanDob.split("T")[0].split("-");
        if (parts.length === 3) {
          const [year, month, day] = parts;
          return `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;
        }
      }
      // Handle MM/DD/YYYY already
      if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(cleanDob)) {
        const [month, day, year] = cleanDob.split("/");
        return `${month.padStart(2, "0")}/${day.padStart(2, "0")}/${year}`;
      }
    }
    const d = new Date(dob);
    if (isNaN(d.getTime())) return "N/A";
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    const year = d.getUTCFullYear();
    return `${month}/${day}/${year}`;
  } catch (err) {
    return "N/A";
  }
};

/**
 * Bug-007: Standardize UTC server timestamp and convert to user's local timezone
 */
export const formatNotificationTimestamp = (timestamp) => {
  if (!timestamp) return "Just now";
  let dateObj;
  try {
    if (typeof timestamp === "string") {
      let s = timestamp.trim();
      // If timestamp lacks timezone offset, append 'Z' for UTC standard interpretation
      if (/^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}(\.\d+)?$/.test(s)) {
        s = s.replace(" ", "T") + "Z";
      }
      dateObj = new Date(s);
    } else {
      dateObj = new Date(timestamp);
    }

    if (isNaN(dateObj.getTime())) return "N/A";

    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    let relativeStr = "";
    if (diffSec < 45) {
      relativeStr = "Just now";
    } else if (diffMin < 60) {
      relativeStr = `${diffMin} min${diffMin > 1 ? "s" : ""} ago`;
    } else if (diffHour < 24 && now.getDate() === dateObj.getDate()) {
      relativeStr = `${diffHour} hr${diffHour > 1 ? "s" : ""} ago`;
    } else if (diffDay === 1 || (diffHour < 48 && now.getDate() - dateObj.getDate() === 1)) {
      relativeStr = "Yesterday";
    }

    const localTimeStr = dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const localDateStr = dateObj.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (relativeStr) {
      return `${relativeStr} (${localTimeStr})`;
    }
    return `${localDateStr}, ${localTimeStr}`;
  } catch (e) {
    return "N/A";
  }
};
