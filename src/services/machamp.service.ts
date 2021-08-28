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
	
}

export default MachampService.getInstance();;
