export const formatAddress = (addr) => {
  return addr && `${addr.substr(0, 6)}...${addr.substr(-4)}`;
};

export const calculateRating = (upvotes, downvotes) => {
  const totalVotes = upvotes + downvotes;
  if (totalVotes === 0) {
    return 0;
  }
  const pUpvoted = upvotes / totalVotes;
  const rating = pUpvoted * 5;
  return Math.round(rating * 100) / 100;
};
