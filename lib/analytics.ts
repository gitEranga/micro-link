/**
 * Safe analytics tracking function for Datadog RUM
 */
export function trackEvent(eventName: string, data: Record<string, any>): void {
    if (typeof window !== 'undefined') {
      const ddRum = (window as any).DD_RUM;
      if (ddRum && typeof ddRum.addAction === 'function') {
        ddRum.addAction(eventName, {
          ...data,
          timestamp: data.timestamp || new Date().toISOString()
        });
      }
    }
  }
  
  /**
   * Track errors in Datadog RUM
   */
  export function trackError(error: Error | string, context?: Record<string, any>): void {
    if (typeof window !== 'undefined') {
      const ddRum = (window as any).DD_RUM;
      if (ddRum && typeof ddRum.addError === 'function') {
        ddRum.addError(error, context);
      }
    }
  }
  
  /**
   * Set user information in Datadog RUM
   */
  export function setUser(user: { id: string; name?: string; email?: string; [key: string]: any }): void {
    if (typeof window !== 'undefined') {
      const ddRum = (window as any).DD_RUM;
      if (ddRum && typeof ddRum.setUser === 'function') {
        ddRum.setUser(user);
      }
    }
  }
  
  /**
   * Log events on the server side
   */
  export function logServerEvent(eventName: string, data: Record<string, any>): void {
    if (typeof window === 'undefined') {
      console.log(JSON.stringify({
        event: eventName,
        ...data,
        timestamp: data.timestamp || new Date().toISOString()
      }));
    }
  }