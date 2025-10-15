export default (time: string) => {
  const currentTime = new Date();
  const timestamp = new Date(time);
  const timeDiff = (currentTime.getTime() - timestamp.getTime()) / 1000;

  if (timeDiff < 60) {
    return "A few seconds ago";
  } else if (timeDiff < 3600) {
    const minutes = Math.floor(timeDiff / 60);
    return `${minutes} ${minutes === 1 ? "min" : "mins"} ago`;
  } else if (timeDiff < 86400) {
    const hours = Math.floor(timeDiff / 3600);
    return `${hours === 1 ? "An hour" : `${hours} hours`} ago`;
  } else if (timeDiff < 691200) {
    const days = Math.floor(timeDiff / 86400);
    return days === 1 ? "Yesterday" : `${days} days ago`;
  } else {
    const day = timestamp.getDate();
    const month = timestamp.toLocaleDateString("en-US", { month: "short" });
    const year = timestamp.getFullYear();

    return `${day} ${month} ${year}`;
  }
};
