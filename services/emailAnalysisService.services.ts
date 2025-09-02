export interface EmailAnalysisResult {
    isPersonal: boolean;
    companyRecruiter: string;
    companyName: string | null;
  }
  
  export class EmailTransformerService {
    private static readonly PERSONAL_DOMAINS = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'icloud.com',
      'aol.com',
      'protonmail.com',
      'live.com',
      'msn.com'
    ];
  
    private static readonly COMMON_DOMAINS = [
      'com',
      'net',
      'org',
      'edu',
      'gov',
      'mil',
      'io',
      'co',
      'ai',
      'dev'
    ];
  
    /**
     * Analiza un email y extrae información sobre si es personal y datos de la compañía
     */
    public static analyzeEmail(email: string): EmailAnalysisResult {
      if (!this.isValidEmail(email)) {
        throw new Error('Invalid email format');
      }
  
      const normalizedEmail = email.toLowerCase().trim();
      const domain = this.extractDomain(normalizedEmail);
      const username = this.extractUsername(normalizedEmail);
  
      const isPersonal = this.isPersonalEmail(domain);
      const companyName = isPersonal ? null : this.extractCompanyName(domain);
      const companyRecruiter = this.extractRecruiterName(username);
  
      return {
        isPersonal,
        companyRecruiter,
        companyName
      };
    }
  
    /**
     * Verifica si el formato del email es válido
     */
    private static isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    /**
     * Extrae el dominio del email
     */
    private static extractDomain(email: string): string {
      return email.split('@')[1];
    }
  
    /**
     * Extrae el nombre de usuario del email
     */
    private static extractUsername(email: string): string {
      return email.split('@')[0];
    }
  
    /**
     * Determina si el email es de un dominio personal
     */
    private static isPersonalEmail(domain: string): boolean {
      return this.PERSONAL_DOMAINS.includes(domain);
    }
  
    /**
     * Extrae el nombre de la compañía del dominio
     */
    private static extractCompanyName(domain: string): string {
      // Remover subdominios comunes como 'mail', 'contact', etc.
      const cleanDomain = domain
        .replace(/^(mail|contact|hr|jobs|careers|recruiting|talent)\./, '')
        .replace(/\.(com|net|org|edu|gov|mil|io|co|cl|ar|br|mx|es)$/, '');
  
      // Si después de limpiar queda vacío, usar el dominio completo
      if (!cleanDomain || this.COMMON_DOMAINS.includes(cleanDomain)) {
        return domain.split('.')[0]; // Tomar la primera parte del dominio
      }
  
      return cleanDomain;
    }
  
    /**
     * Extrae y formatea el nombre del reclutador desde el username
     */
    private static extractRecruiterName(username: string): string {
      // Remover números y caracteres especiales comunes
      let cleanName = username
        .replace(/[0-9._-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
  
      // Si el nombre contiene puntos, separar y capitalizar
      if (cleanName.includes('.')) {
        cleanName = cleanName
          .split('.')
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ');
      } else {
        // Capitalizar primera letra si es una sola palabra
        cleanName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      }
  
      return cleanName || 'Unknown';
    }
  }
  
  // Ejemplo de uso:
  // const result = EmailTransformerService.analyzeEmail('contacto@cazatalentos.cl');
  // console.log(result);
  // Output: { isPersonal: false, companyRecruiter: 'Contacto', companyName: 'cazatalentos' }
  
  // const result2 = EmailTransformerService.analyzeEmail('juan.perez@gmail.com');
  // console.log(result2);
  // Output: { isPersonal: true, companyRecruiter: 'Juan Perez', companyName: null }