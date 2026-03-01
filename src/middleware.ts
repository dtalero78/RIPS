export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/pacientes/:path*",
    "/medicos/:path*",
    "/servicios/:path*",
    "/atenciones/:path*",
    "/rips/:path*",
    "/configuracion/:path*",
  ],
};
