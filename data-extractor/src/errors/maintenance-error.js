class MaintenanceError extends Error {
  constructor() {
    const message = `API or Clash is currently in maintenance`;
    super(message);
    this.code = 'MAINTENANCE_ERROR';
    this.message = message;
    this.retryMinutes = 20;
  }
}

module.exports = MaintenanceError;