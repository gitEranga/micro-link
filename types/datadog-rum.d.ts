interface DatadogRUM {
    init: (config: {
      applicationId: string;
      clientToken: string;
      site: string;
      service: string;
      env: string;
      version: string;
      sampleRate: number;
      trackInteractions: boolean;
      defaultPrivacyLevel?: string;
    }) => void;
    addAction: (name: string, data?: Record<string, any>) => void;
    addError: (error: Error | string, context?: Record<string, any>) => void;
    setUser: (user: {
      id: string;
      name?: string;
      email?: string;
      [key: string]: any;
    }) => void;
  }
  
  interface Window {
    DD_RUM?: DatadogRUM;
  }