/**
 * Context Builder
 * Constructs high-quality prompts for the AI by combining user queries with real-time match/player data.
 */

export const buildSportsContext = (query, data = {}) => {
  const { match, player, comparison } = data;
  
  let context = "You are Apex AI, a specialized sports analyst for the Apex Sports Intelligence Platform. ";
  context += "Provide concise, data-driven insights. Be professional but engaging.\n\n";

  if (match) {
    context += `CURRENT MATCH CONTEXT:\n- Match: ${match.homeTeam} vs ${match.awayTeam}\n- Score: ${match.score.home} - ${match.score.away}\n- Status: ${match.status}\n- Key Events: ${match.events.map(e => e.type).join(', ')}\n\n`;
  }

  if (player) {
    context += `PLAYER PROFILE:\n- Name: ${player.name}\n- Team: ${player.team}\n- Sport: ${player.sport}\n- CSPI Rating: ${player.cspiScore}\n- Recent Form: ${player.form.map(f => f.rating).join(', ')}\n\n`;
  }

  if (comparison) {
    context += `COMPARISON DATA:\n- Player A: ${comparison.playerA.name} (${comparison.playerA.cspi})\n- Player B: ${comparison.playerB.name} (${comparison.playerB.cspi})\n- Leader: ${comparison.leader}\n\n`;
  }

  context += `USER QUERY: ${query}\n`;
  context += "ANALYSIS:";

  return context;
};
