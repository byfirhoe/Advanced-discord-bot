const pb = {
  le: "<:LE:1402024162339459103>",
  me: "<:ME:1402024226281619698>",
  re: "<:RE:1402024266588885022>",
  lf: "<:LF:1402024310540861620> ",
  mf: "<:MF:1402024367839383634> ",
  rf: "<:RF:1402024387225452666> ",
};

function formatResults(upvotes = [], downvotes = []) {
  const totalVotes = upvotes.length + downvotes.length;
  const progressBarLength = 14;
  const filledSquares =
    Math.round((upvotes.length / totalVotes) * progressBarLength) || 0;
  const emptySquares = progressBarLength - filledSquares || 0;

  if (!filledSquares && !emptySquares) {
    emptySquares = progressBarLength;
  }

  const upPercentage = (upvotes.length / totalVotes) * 100 || 0;
  const downPercentage = (downvotes.length / totalVotes) * 100 || 0;

  const progressBar =
    (filledSquares ? pb.lf : pb.le) +
    (pb.mf.repeat(filledSquares) + pb.me.repeat(emptySquares)) +
    (filledSquares === progressBarLength ? pb.rf : pb.re);

  const results = [];
  results.push(
    `👍 ${upvotes.length} upvotes (${upPercentage.toFixed(1)}%) • 👎 ${
      downvotes.length
    } downvotes (${downPercentage.toFixed(1)}%)`
  );
  results.push(progressBar);

  return results.join("\n");
}

module.exports = formatResults;
