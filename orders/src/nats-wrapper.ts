import nats, {Stan} from 'node-nats-streaming';

class NatsWrapper {
    private _client?: Stan;

    get client(): Stan {
        if (!this._client) {
            throw new Error('Cannot access NATS client before connect')
        }

        return this._client;
    }

    public connect(clusterId: string, clientId: string, url: string): Promise<void> {
        this._client = nats.connect(clusterId, clientId, {url});

        return new Promise((resolve, reject) => {
            this.client.on('connect', () => {
                console.log('Connect to NATS');
                resolve();
            });

            this.client.on('error', err => {
                reject(err);
            });
        });
    }
}

export const natsWrapper = new NatsWrapper();