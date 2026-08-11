export function VideoEmbed({ videoId, title, credit }: { videoId: string; title: string; credit: string }) {
  return (
    <figure className="rounded-xl overflow-hidden bg-white shadow-sm border border-brand/10">
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="h-full w-full"
        />
      </div>
      <figcaption className="px-4 py-3">
        <p className="font-medium text-base text-brand-dark">{title}</p>
        <p className="text-sm text-ink-soft mt-0.5">Video credit: {credit}</p>
      </figcaption>
    </figure>
  );
}
