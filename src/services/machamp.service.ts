import amq from 'amqplib';

class MachampService {
	private static instance: MachampService;

  private channel: amq.Channel | null;

	private constructor() {
		this.channel = null;
	}

	public static getInstance(): MachampService {
		if (!MachampService.instance) {
			MachampService.instance = new MachampService();
		}

		return MachampService.instance;
	}

  public setChannel(channel: amq.Channel) {
    this.channel = channel;
  }
	
  public sendTask(system: string, task: string, params?: Record<string, any>) {
    if (!this.channel) {
      console.log('machamp channel not ready!');

      return;
    }

    const msg = `machamp:${system}:${task}`;

    this.channel.sendToQueue('machamp', Buffer.from(msg));
  }
}

export default MachampService.getInstance();;
