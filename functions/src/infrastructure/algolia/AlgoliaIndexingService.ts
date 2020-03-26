import {IndexingService} from '../../application';
import { Trial } from '../../domain';
import { serialize } from './serialize';


export class AlgoliaIndexingService implements IndexingService {
    async indexTrials(trials: Array<Trial>) {
        await algoliaIndex.replaceAllObjects(
            trials.map(trial => serialize(trial)),
            {
              safe: true,
              batchSize: 50
            }
          ); 
    }
}