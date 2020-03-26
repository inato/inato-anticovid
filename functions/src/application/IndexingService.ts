import {Trial} from '../domain';

export interface IndexingService {
    indexTrials(trials: Array<Trial>): Promise<void>;
}