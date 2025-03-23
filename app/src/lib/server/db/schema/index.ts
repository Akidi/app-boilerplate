import {users} from './users';
import {sessions} from './sessions';
import {logs} from './logs';

export type { User, NewUser } from './users';
export type { Session, NewSession } from './sessions';
export type { Log, NewLog } from './logs';

export const tables = {
    users,
    sessions,
    logs
}


