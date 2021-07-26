// This is going to be an experimental object to keep track of well, global status.
// The scope of this object definitely needs to stay limited.

export type RouteName = 'sys' | 'food';
type Status = 'Online' | 'Offline' | 'Pending';

// Add support for Mongo, Redis, RabbitMQ, Influx
type SysService = 'mongo';

// This is just services that I've created that aren't RUtils, like Machamp
type VigilService = '';

class GlobalStatus {
  private static instance: GlobalStatus;

  private RouteStatus: Record<RouteName, Status>;
  private SystemStatus: Record<SysService, Status>;

  private constructor() {
    this.RouteStatus = {
      sys: 'Pending',
      food: 'Pending'
    }

    this.SystemStatus = {
      mongo: 'Pending'
    }
  }

  public setRouteStatus(route: RouteName, status: Status) {
    this.RouteStatus[route] = status;
  }

  public setSysStatus(service: SysService, status: Status) {
    this.SystemStatus[service] = status;
  }

  public getSystemStatus() {
    return this.SystemStatus;
  }

  public getRouteStatus() {
    return this.RouteStatus;
  }

  public static getInstance(): GlobalStatus {
		if (!GlobalStatus.instance) {
			GlobalStatus.instance = new GlobalStatus();
		}

		return GlobalStatus.instance;
	}
}

const globalStatus = GlobalStatus.getInstance();
export default globalStatus;
