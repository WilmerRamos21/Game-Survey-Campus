import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Game Survey Campus',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      launchFadeInDuration: 300,
      backgroundColor: '#f1f5f9', // Asegura el fondo uniforme aquí también
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_INSIDE' // 🌟 Esto evita que la imagen se estire bruscamente a los bordes
    }
  }
};

export default config;
