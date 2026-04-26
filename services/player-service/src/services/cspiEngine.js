/**
 * CSPI (Cross-Sport Index) Engine
 * Normalizes performance metrics across different sports to provide a universal "Power Rating".
 */

export const calculateCSPI = (player) => {
  const { attributes, form, careerStats } = player;
  
  // 1. Base Attribute Score (Weight: 40%)
  const attributeValues = Object.values(attributes);
  const avgAttribute = attributeValues.reduce((a, b) => a + b, 0) / attributeValues.length;
  const attributeScore = (avgAttribute / 100) * 40;

  // 2. Current Form Score (Weight: 40%)
  // Based on last 5 match ratings
  let formScore = 0;
  if (form && form.length > 0) {
    const recentForm = form.slice(-5);
    const avgRating = recentForm.reduce((acc, curr) => acc + curr.rating, 0) / recentForm.length;
    formScore = (avgRating / 10) * 40; // Assuming rating is out of 10
  }

  // 3. Career Experience Score (Weight: 20%)
  // Simple logarithmic scale for matches played
  const careerScore = Math.min((Math.log10(careerStats.matches + 1) / 2.5) * 20, 20);

  const totalScore = attributeScore + formScore + careerScore;
  
  return parseFloat(totalScore.toFixed(2));
};

export const comparePlayers = (playerA, playerB) => {
  const scoreA = calculateCSPI(playerA);
  const scoreB = calculateCSPI(playerB);
  
  return {
    playerA: {
      id: playerA._id,
      name: playerA.name,
      cspi: scoreA
    },
    playerB: {
      id: playerB._id,
      name: playerB.name,
      cspi: scoreB
    },
    difference: parseFloat(Math.abs(scoreA - scoreB).toFixed(2)),
    leader: scoreA > scoreB ? playerA.name : (scoreB > scoreA ? playerB.name : 'Tie')
  };
};
