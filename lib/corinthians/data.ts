// Dados do jogo "Missão Permanência". Tudo aqui é cenário fictício:
// tabela, overalls e calendário foram inventados para o jogo.

export type Sector = "defesa" | "meio" | "ataque";
export type Position = "GOL" | "LD" | "ZAG" | "LE" | "VOL" | "MEI" | "ATA";

export type Player = {
  id: string;
  name: string;
  // Nome curto para o campinho.
  short?: string;
  pos: Position;
  rating: number;
  legend?: boolean;
  tagline?: string;
};

export type Team = {
  id: string;
  name: string;
  short: string;
  color: string;
  overall: number;
};

export type Standing = {
  teamId: string;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
};

export type Slot = {
  id: string;
  sector: Sector;
  pos: Position;
  // Posição no campo, em %, com o ataque para cima.
  x: number;
  y: number;
};

export const COR_ID = "cor";
export const FIRST_ROUND = 31;
export const LAST_ROUND = 38;
export const RELEGATION_SPOTS = 4;

export const TEAMS: Team[] = [
  { id: "fla", name: "Flamengo", short: "FLA", color: "#c8102e", overall: 83 },
  { id: "pal", name: "Palmeiras", short: "PAL", color: "#0b7a3e", overall: 82 },
  { id: "cru", name: "Cruzeiro", short: "CRU", color: "#2f4fa2", overall: 79 },
  { id: "bot", name: "Botafogo", short: "BOT", color: "#d4d4d8", overall: 79 },
  { id: "flu", name: "Fluminense", short: "FLU", color: "#8a2346", overall: 78 },
  { id: "bah", name: "Bahia", short: "BAH", color: "#1d4ed8", overall: 77 },
  { id: "mir", name: "Mirassol", short: "MIR", color: "#facc15", overall: 75 },
  { id: "sao", name: "São Paulo", short: "SAO", color: "#dc2626", overall: 77 },
  { id: "cam", name: "Atlético-MG", short: "CAM", color: "#a1a1aa", overall: 77 },
  { id: "int", name: "Internacional", short: "INT", color: "#b91c1c", overall: 76 },
  { id: "rbb", name: "Bragantino", short: "RBB", color: "#e11d48", overall: 75 },
  { id: "gre", name: "Grêmio", short: "GRE", color: "#0ea5e9", overall: 75 },
  { id: "vas", name: "Vasco", short: "VAS", color: "#a3a3a3", overall: 75 },
  { id: "san", name: "Santos", short: "SAN", color: "#f5f5f5", overall: 75 },
  { id: "cap", name: "Athletico-PR", short: "CAP", color: "#991b1b", overall: 73 },
  { id: "vit", name: "Vitória", short: "VIT", color: "#ef4444", overall: 72 },
  { id: "cor", name: "Corinthians", short: "COR", color: "#ffffff", overall: 74 },
  { id: "cfc", name: "Coritiba", short: "CFC", color: "#15803d", overall: 72 },
  { id: "cha", name: "Chapecoense", short: "CHA", color: "#22c55e", overall: 70 },
  { id: "rem", name: "Remo", short: "REM", color: "#1e3a8a", overall: 70 },
];

export const TEAM_BY_ID: Record<string, Team> = Object.fromEntries(
  TEAMS.map((t) => [t.id, t])
);

// Tabela após a 30ª rodada.
export const INITIAL_STANDINGS: Standing[] = [
  { teamId: "fla", w: 19, d: 6, l: 5, gf: 58, ga: 24 },
  { teamId: "pal", w: 18, d: 7, l: 5, gf: 52, ga: 25 },
  { teamId: "cru", w: 16, d: 7, l: 7, gf: 44, ga: 28 },
  { teamId: "bot", w: 15, d: 7, l: 8, gf: 43, ga: 31 },
  { teamId: "flu", w: 14, d: 8, l: 8, gf: 40, ga: 32 },
  { teamId: "bah", w: 14, d: 6, l: 10, gf: 41, ga: 36 },
  { teamId: "mir", w: 13, d: 7, l: 10, gf: 39, ga: 34 },
  { teamId: "sao", w: 12, d: 8, l: 10, gf: 36, ga: 33 },
  { teamId: "cam", w: 11, d: 9, l: 10, gf: 35, ga: 34 },
  { teamId: "int", w: 11, d: 7, l: 12, gf: 37, ga: 38 },
  { teamId: "rbb", w: 10, d: 9, l: 11, gf: 34, ga: 37 },
  { teamId: "gre", w: 10, d: 8, l: 12, gf: 35, ga: 39 },
  { teamId: "vas", w: 10, d: 7, l: 13, gf: 36, ga: 42 },
  { teamId: "san", w: 9, d: 9, l: 12, gf: 33, ga: 38 },
  { teamId: "cap", w: 9, d: 8, l: 13, gf: 31, ga: 39 },
  { teamId: "vit", w: 9, d: 7, l: 14, gf: 29, ga: 40 },
  { teamId: "cor", w: 8, d: 7, l: 15, gf: 30, ga: 41 },
  { teamId: "cfc", w: 8, d: 6, l: 16, gf: 27, ga: 43 },
  { teamId: "cha", w: 7, d: 6, l: 17, gf: 26, ga: 47 },
  { teamId: "rem", w: 6, d: 7, l: 17, gf: 24, ga: 48 },
];

// Jogos restantes do Corinthians, da 31ª à 38ª rodada.
export const COR_FIXTURES: { opponentId: string; home: boolean }[] = [
  { opponentId: "vas", home: true },
  { opponentId: "pal", home: false },
  { opponentId: "vit", home: true },
  { opponentId: "san", home: false },
  { opponentId: "fla", home: true },
  { opponentId: "cap", home: false },
  { opponentId: "sao", home: true },
  { opponentId: "int", home: false },
];

// 4-3-3, com o ataque para cima.
export const SLOTS: Slot[] = [
  { id: "a1", sector: "ataque", pos: "ATA", x: 20, y: 17 },
  { id: "a2", sector: "ataque", pos: "ATA", x: 50, y: 12 },
  { id: "a3", sector: "ataque", pos: "ATA", x: 80, y: 17 },
  { id: "m1", sector: "meio", pos: "MEI", x: 24, y: 42 },
  { id: "m2", sector: "meio", pos: "VOL", x: 50, y: 49 },
  { id: "m3", sector: "meio", pos: "MEI", x: 76, y: 42 },
  { id: "lb", sector: "defesa", pos: "LE", x: 12, y: 68 },
  { id: "cb1", sector: "defesa", pos: "ZAG", x: 37, y: 73 },
  { id: "cb2", sector: "defesa", pos: "ZAG", x: 63, y: 73 },
  { id: "rb", sector: "defesa", pos: "LD", x: 88, y: 68 },
  { id: "gk", sector: "defesa", pos: "GOL", x: 50, y: 89 },
];

// Titulares de hoje. Overalls fictícios — ajuste à vontade.
export const STARTERS: Record<string, Player> = {
  gk: { id: "hugo-souza", name: "Hugo Souza", pos: "GOL", rating: 76 },
  rb: { id: "matheuzinho", name: "Matheuzinho", pos: "LD", rating: 72 },
  cb1: { id: "andre-ramalho", name: "André Ramalho", short: "Ramalho", pos: "ZAG", rating: 73 },
  cb2: { id: "gustavo-henrique", name: "Gustavo Henrique", short: "G. Henrique", pos: "ZAG", rating: 72 },
  lb: { id: "angileri", name: "Angileri", pos: "LE", rating: 71 },
  m1: { id: "breno-bidon", name: "Breno Bidon", short: "Bidon", pos: "MEI", rating: 74 },
  m2: { id: "raniele", name: "Raniele", pos: "VOL", rating: 72 },
  m3: { id: "garro", name: "Rodrigo Garro", short: "Garro", pos: "MEI", rating: 77 },
  a1: { id: "memphis", name: "Memphis Depay", short: "Memphis", pos: "ATA", rating: 80 },
  a2: { id: "yuri-alberto", name: "Yuri Alberto", short: "Yuri", pos: "ATA", rating: 76 },
  a3: { id: "talles-magno", name: "Talles Magno", short: "Talles", pos: "ATA", rating: 71 },
};

const legend = (
  id: string,
  name: string,
  pos: Position,
  rating: number,
  tagline: string,
  short?: string
): Player => ({ id, name, short, pos, rating, tagline, legend: true });

export const LEGENDS: Record<Sector, Player[]> = {
  defesa: [
    legend("cassio", "Cássio", "GOL", 90, "Herói do Mundial de 2012"),
    legend("gylmar", "Gylmar", "GOL", 91, "Paredão dos anos 50"),
    legend("ronaldo-giovanelli", "Ronaldo Giovanelli", "GOL", 86, "Goleiro do título de 1990", "Ronaldo G."),
    legend("dida", "Dida", "GOL", 89, "Campeão do Mundial de 2000"),
    legend("ze-maria", "Zé Maria", "LD", 89, "O Super Zé"),
    legend("alessandro", "Alessandro", "LD", 83, "Capitão da Libertadores 2012"),
    legend("fagner", "Fagner", "LD", 84, "Campeão brasileiro em 2015 e 2017"),
    legend("wladimir", "Wladimir", "LE", 87, "Recordista de jogos pelo clube"),
    legend("fabio-santos", "Fábio Santos", "LE", 84, "Lateral do Mundial de 2012", "F. Santos"),
    legend("gamarra", "Gamarra", "ZAG", 90, "O zagueiro que não fazia falta"),
    legend("domingos-da-guia", "Domingos da Guia", "ZAG", 91, "O Divino Mestre", "Domingos"),
    legend("chicao", "Chicão", "ZAG", 84, "Campeão da Libertadores 2012"),
    legend("paulo-andre", "Paulo André", "ZAG", 83, "Zagueiro do Mundial de 2012", "P. André"),
    legend("gil", "Gil", "ZAG", 84, "Xerife do título de 2015"),
    legend("balbuena", "Balbuena", "ZAG", 85, "Muralha paraguaia de 2017"),
  ],
  meio: [
    legend("socrates", "Sócrates", "MEI", 96, "Doutor da Democracia Corinthiana"),
    legend("rivellino", "Rivellino", "MEI", 95, "O Reizinho do Parque"),
    legend("marcelinho", "Marcelinho Carioca", "MEI", 91, "O Pé de Anjo", "Marcelinho"),
    legend("neto", "Neto", "MEI", 89, "Xodó da Fiel, campeão de 1990"),
    legend("ricardinho", "Ricardinho", "MEI", 88, "Cérebro do Mundial de 2000"),
    legend("rincon", "Freddy Rincón", "VOL", 89, "Capitão do Mundial de 2000", "Rincón"),
    legend("vampeta", "Vampeta", "VOL", 87, "Volante do bi brasileiro 98/99"),
    legend("paulinho", "Paulinho", "VOL", 88, "Motor do time de 2012"),
    legend("ralf", "Ralf", "VOL", 85, "Incansável de 2012"),
    legend("elias", "Elias", "VOL", 85, "Campeão brasileiro de 2015"),
    legend("renato-augusto", "Renato Augusto", "MEI", 87, "Maestro do título de 2015", "R. Augusto"),
    legend("danilo", "Danilo", "MEI", 86, "O Zidanilo"),
    legend("jadson", "Jadson", "MEI", 85, "Meia do título de 2015"),
    legend("biro-biro", "Biro-Biro", "VOL", 84, "Raça da Democracia Corinthiana"),
    legend("zenon", "Zenon", "MEI", 86, "Camisa 10 do bi paulista 82/83"),
  ],
  ataque: [
    legend("ronaldo", "Ronaldo Fenômeno", "ATA", 95, "O Fenômeno de 2009", "Ronaldo"),
    legend("tevez", "Carlitos Tevez", "ATA", 92, "Craque do Brasileirão 2005", "Tevez"),
    legend("claudio", "Cláudio", "ATA", 89, "Maior artilheiro da história do clube"),
    legend("baltazar", "Baltazar", "ATA", 88, "O Cabecinha de Ouro"),
    legend("teleco", "Teleco", "ATA", 88, "Artilheiro dos anos 30 e 40"),
    legend("edilson", "Edílson", "ATA", 89, "O Capetinha do Mundial de 2000"),
    legend("luizao", "Luizão", "ATA", 88, "Artilheiro da Libertadores 2000"),
    legend("casagrande", "Casagrande", "ATA", 87, "Centroavante da Democracia"),
    legend("viola", "Viola", "ATA", 86, "Gol do título paulista de 1988"),
    legend("sheik", "Emerson Sheik", "ATA", 86, "Herói da final da Libertadores 2012", "Sheik"),
    legend("guerrero", "Paolo Guerrero", "ATA", 87, "Gol do título Mundial de 2012", "Guerrero"),
    legend("liedson", "Liedson", "ATA", 85, "O Levezinho de 2011"),
    legend("jo", "Jô", "ATA", 84, "Artilheiro do título de 2017"),
  ],
};

export const SECTOR_LABEL: Record<Sector, string> = {
  defesa: "Defesa",
  meio: "Meio-campo",
  ataque: "Ataque",
};
