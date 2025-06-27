const defaultURL = 'https://visitearegiaovulcanica.vercel.app/afiliados/'
export function copyLink(slug: string){
     navigator.clipboard.writeText(defaultURL + slug)
}