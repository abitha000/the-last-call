export type AnalyticsEvent =
  | {type:"GAME_CREATED"; gameId:string; at:number}
  | {type:"PLAYER_JOINED"; gameId:string; playerId:string; at:number}
  | {type:"PHASE_CHANGED"; gameId:string; phase:string; at:number}
  | {type:"GAME_ENDED"; gameId:string; winner:string; at:number};
