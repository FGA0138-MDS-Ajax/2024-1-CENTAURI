import {z} from 'zod';

export const GameSchema = z.object({
    rodada: z.number(),
    campeonato: z.string(),
    hora: z.string().regex(/^\d{2}h\d{2}$/, "Invalid time format").transform((val) => {
        const [hours, minutes] = val.split('h').map(Number);
        const now = new Date();
        now.setHours(hours - 3);
        now.setMinutes(minutes);
        now.setSeconds(0);
        now.setMilliseconds(0);
        return now;
    }),
    time1: z.string(),
    time2: z.string(),
    channels: z.tuple([z.string(), z.string().array()]).transform(([first, rest]) => [first, ...rest]),
});

export const InsertGameSchema = z.object({
    rodada: z.number(),
    campeonato: z.string(),
    hora: z.string(),
    time1: z.string(),
    time2: z.string(),
    channels: z.array(z.string()).max(3, "Array must contain at most 3 element(s)")
});
export type InsertGame = z.infer<typeof InsertGameSchema>;

export type Game = z.infer<typeof GameSchema>;

export const GameChannelSchema = z.object({
    campeonato: z.string(),
    data_hora: z.string(),
    time_1: z.string(),
    time_2: z.string(),
    channels: z.array(z.string())
});

export const rodadaSchema = z.object({
    rodada: z.number()
});
export type Rodada = z.infer<typeof rodadaSchema>;

export type GameChannel = z.infer<typeof GameChannelSchema>;