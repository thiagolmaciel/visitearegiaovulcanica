'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useState, useEffect } from 'react';
import { Event } from '@/model/Event';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface EventsCarouselProps {
  events: Event[];
  title?: string;
}

const categoryLabels: Record<string, string> = {
  geral: "Geral",
  festival: "Festival",
  turismo: "Turismo",
  workshop: "Workshop",
  gastronomia: "Gastronomia",
  cultura: "Cultura",
  esporte: "Esporte",
  outro: "Outro",
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const months = [
    "jan", "fev", "mar", "abr", "mai", "jun",
    "jul", "ago", "set", "out", "nov", "dez"
  ]
  return `${date.getDate()} ${months[date.getMonth()]}`
}

const formatFullDate = (dateString: string): string => {
  const date = new Date(dateString)
  const months = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
  ]
  return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`
}

const formatTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
}

const EventsCarousel = ({ events, title = "Próximos Eventos" }: EventsCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    skipSnaps: false,
    dragFree: false,
    containScroll: 'trimSnaps',
    loop: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (emblaApi) {
      onSelect(emblaApi);
      emblaApi.on('select', onSelect);
      emblaApi.on('reInit', onSelect);
    }
  }, [emblaApi, onSelect]);

  // Auto-scroll quando houver mais de um evento
  useEffect(() => {
    if (events.length <= 1 || !emblaApi) return;

    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0); // Volta ao início quando chega no fim
      }
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, [emblaApi, events.length]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  if (events.length === 0) {
    return null;
  }

  return (
    <div className='embla flex flex-col gap-4 w-full'>
      <div className="embla__viewport overflow-hidden w-full relative" ref={emblaRef}>
        <div className='embla__container flex'>
          {events.map((event) => (
            <div className='embla__slide flex-[0_0_100%] sm:flex-[0_0_100%] lg:flex-[0_0_100%] flex-shrink-0' key={event.id}>
              <div 
                onClick={() => {
                  setSelectedEvent(event);
                  setIsModalOpen(true);
                }}
                className="block h-full cursor-pointer"
              >
                <div className="flex flex-row gap-4 w-full aspect-[6/1.8] bg-white shadow-lg overflow-hidden rounded-xl relative">
                  {/* Lado Esquerdo: Foto, Nome, Tipo */}
                  {event.image_url && (
                    <div className="relative w-[50%] overflow-hidden group flex-shrink-0">
                      <img 
                        src={event.image_url} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="mb-1.5">
                          <span className="px-2.5 py-1 bg-[var(--main-color)] text-white text-xs font-semibold rounded-full">
                            {categoryLabels[event.category] || event.category}
                          </span>
                        </div>
                        <h3 className="text-white font-bold text-xl leading-tight line-clamp-2 drop-shadow-lg">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                  )}
                  
                  {/* Lado Direito: Nome e Demais Informações Completas */}
                  <div className="w-[50%] p-3 sm:p-4 pb-0 flex flex-col gap-3 flex-shrink-0 justify-between relative">
                    <div className="flex flex-col gap-3">
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl sm:text-2xl leading-tight mb-2">
                          {event.title}
                        </h3>
                        <p className="text-gray-700 text-base leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-start gap-2.5 text-sm text-gray-800">
                          <svg className="w-5 h-5 flex-shrink-0 text-[var(--main-color)] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900">{formatDate(event.start_date)}</span>
                            {event.end_date && (
                              <span className="text-gray-600 text-xs mt-0.5">até {formatDate(event.end_date)}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5 text-sm text-gray-800">
                          <svg className="w-5 h-5 flex-shrink-0 text-[var(--main-color)] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900">{event.location}</span>
                            {event.address && (
                              <span className="text-gray-600 text-xs mt-0.5">{event.address}</span>
                            )}
                          </div>
                        </div>
                        {event.price_info && (
                          <div className="flex items-center gap-2.5 text-sm">
                            <svg className="w-5 h-5 flex-shrink-0 text-[var(--main-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-semibold text-[var(--main-color)]">{event.price_info}</span>
                          </div>
                        )}
                        {(event.contact_phone || event.contact_email) && (
                          <div className="flex items-start gap-2.5 text-sm text-gray-800">
                            <svg className="w-5 h-5 flex-shrink-0 text-[var(--main-color)] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <div className="flex flex-col gap-1">
                              {event.contact_phone && (
                                <span className="font-medium">{event.contact_phone}</span>
                              )}
                              {event.contact_email && (
                                <span className="text-gray-600 text-xs">{event.contact_email}</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto bg-[var(--main-color)] text-white px-4 py-3 pr-6 absolute bottom-0 left-0 right-0 -ml-3 sm:-ml-4">
                      <span className="text-xs font-bold">Ver detalhes</span>
                      <svg className="w-3 h-3 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bullets Navigation */}
      {events.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-2">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${
                index === selectedIndex
                  ? 'w-8 h-2 bg-[var(--main-color)]'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Event Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          {selectedEvent && (
            <>
              <DialogTitle className="sr-only">{selectedEvent.title}</DialogTitle>
              <div className="flex flex-col">
              {/* Hero Image Section */}
              {selectedEvent.image_url ? (
                <div className="relative w-full h-64 sm:h-80 overflow-hidden">
                  <img
                    src={selectedEvent.image_url}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-4 py-1.5 bg-[var(--main-color)] text-white text-sm font-semibold rounded-full">
                        {categoryLabels[selectedEvent.category] || selectedEvent.category}
                      </span>
                      {selectedEvent.price_info && (
                        <span className="px-4 py-1.5 bg-white/90 text-[var(--main-color)] text-sm font-semibold rounded-full">
                          {selectedEvent.price_info}
                        </span>
                      )}
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
                      {selectedEvent.title}
                    </h2>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-[var(--main-color)] to-[var(--main-color)]/80 p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 bg-white/20 text-white text-sm font-semibold rounded-full backdrop-blur-sm">
                      {categoryLabels[selectedEvent.category] || selectedEvent.category}
                    </span>
                    {selectedEvent.price_info && (
                      <span className="px-4 py-1.5 bg-white text-[var(--main-color)] text-sm font-semibold rounded-full">
                        {selectedEvent.price_info}
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white">
                    {selectedEvent.title}
                  </h2>
                </div>
              )}

              {/* Content Section */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Description */}
                <div>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Date and Location Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--main-color)]/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-[var(--main-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900">Data e Horário</h3>
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-900">
                        {formatFullDate(selectedEvent.start_date)}
                      </p>
                      <p className="text-gray-600 text-sm">
                        às {formatTime(selectedEvent.start_date)}
                      </p>
                      {selectedEvent.end_date && (
                        <p className="text-gray-600 text-sm mt-2">
                          até {formatFullDate(selectedEvent.end_date)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--main-color)]/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-[var(--main-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900">Localização</h3>
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-900">
                        {selectedEvent.location}
                      </p>
                      {selectedEvent.address && (
                        <p className="text-gray-600 text-sm">
                          {selectedEvent.address}
                        </p>
                      )}
                      {selectedEvent.google_maps_link && (
                        <a
                          href={selectedEvent.google_maps_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[var(--main-color)] text-sm font-medium hover:underline mt-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Ver no Google Maps
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact and Social Media */}
                {(selectedEvent.contact_phone || selectedEvent.contact_email || selectedEvent.website_url || selectedEvent.instagram_url || selectedEvent.facebook_url) && (
                  <div className="border-t pt-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Contato e Redes Sociais</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedEvent.contact_phone && (
                        <a
                          href={`tel:${selectedEvent.contact_phone.replace(/\s/g, "")}`}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[var(--main-color)]/10 flex items-center justify-center group-hover:bg-[var(--main-color)]/20 transition-colors">
                            <svg className="w-5 h-5 text-[var(--main-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                          <span className="font-medium text-gray-900">{selectedEvent.contact_phone}</span>
                        </a>
                      )}
                      {selectedEvent.contact_email && (
                        <a
                          href={`mailto:${selectedEvent.contact_email}`}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[var(--main-color)]/10 flex items-center justify-center group-hover:bg-[var(--main-color)]/20 transition-colors">
                            <svg className="w-5 h-5 text-[var(--main-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="font-medium text-gray-900">{selectedEvent.contact_email}</span>
                        </a>
                      )}
                      {selectedEvent.website_url && (
                        <a
                          href={selectedEvent.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[var(--main-color)]/10 flex items-center justify-center group-hover:bg-[var(--main-color)]/20 transition-colors">
                            <svg className="w-5 h-5 text-[var(--main-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                          </div>
                          <span className="font-medium text-gray-900">Website</span>
                        </a>
                      )}
                      {selectedEvent.instagram_url && (
                        <a
                          href={selectedEvent.instagram_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[var(--main-color)]/10 flex items-center justify-center group-hover:bg-[var(--main-color)]/20 transition-colors">
                            <svg className="w-5 h-5 text-[var(--main-color)]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </div>
                          <span className="font-medium text-gray-900">Instagram</span>
                        </a>
                      )}
                      {selectedEvent.facebook_url && (
                        <a
                          href={selectedEvent.facebook_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-full bg-[var(--main-color)]/10 flex items-center justify-center group-hover:bg-[var(--main-color)]/20 transition-colors">
                            <svg className="w-5 h-5 text-[var(--main-color)]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                          </div>
                          <span className="font-medium text-gray-900">Facebook</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EventsCarousel

