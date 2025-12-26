import Head from 'next/head';
import { useMemo, useState } from 'react';
import planData from '@/data/content-plan.json';

interface RawEntry {
  jour: string;
  date: string;
  horaire: string;
  [key: string]: string;
}

type PlatformKey = 'facebook' | 'instagram' | 'tiktok';

type Post = {
  jour: string;
  date: string;
  horaire: string;
  thematique: string;
  accroche: string;
  copywriting: string;
  ideeVisuel: string;
  ideeVideo: string;
  cta: string;
  ideeTemoignage: string;
  prompt: string;
};

const platforms: { key: PlatformKey; label: string; description: string }[] = [
  {
    key: 'facebook',
    label: 'Facebook',
    description:
      'Focus sur les responsables de grandes surfaces : posts pédagogiques, data et preuves sociales pour convertir en rendez-vous.'
  },
  {
    key: 'instagram',
    label: 'Instagram',
    description:
      'Contenus visuels premium pour boulangeries, restaurants, salons et pharmacies, avec storytelling et design vitrine.'
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    description:
      'Formats vidéos rapides montrant les coulisses, transformations express et témoignages dynamiques.'
  }
];

const transformEntry = (entry: RawEntry): Post => ({
  jour: entry.jour,
  date: entry.date,
  horaire: entry.horaire,
  thematique: entry['thématique'],
  accroche: entry['accroche'],
  copywriting: entry['copywriting'],
  ideeVisuel: entry['idéeVisuel'],
  ideeVideo: entry['idéeVideo'],
  cta: entry['cta'],
  ideeTemoignage: entry['idéeTémoignage'],
  prompt: entry['prompt']
});

const dataByPlatform: Record<PlatformKey, Post[]> = {
  facebook: (planData.facebook as RawEntry[]).map(transformEntry),
  instagram: (planData.instagram as RawEntry[]).map(transformEntry),
  tiktok: (planData.tiktok as RawEntry[]).map(transformEntry)
};

const stats = {
  posts: Object.values(dataByPlatform).reduce((acc, list) => acc + list.length, 0),
  hooks: new Set(
    Object.values(dataByPlatform)
      .flat()
      .map((entry) => entry.accroche)
  ).size
};

const downloadHref = '/content-plan.xlsx';

export default function Home() {
  const [platformKey, setPlatformKey] = useState<PlatformKey>('facebook');
  const posts = useMemo(() => dataByPlatform[platformKey], [platformKey]);

  return (
    <>
      <Head>
        <title>Plan éditorial 30 jours — écrans d&apos;étiquetage</title>
        <meta
          name="description"
          content="Plan de contenu 30 jours, 3 publications par jour et par plateforme pour lancer les écrans d'étiquetage digitaux."
        />
      </Head>
      <main style={{ padding: '48px 24px', maxWidth: 1280, margin: '0 auto' }}>
        <section style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: 16 }}>
            Plan éditorial 30 jours — Écrans d’étiquetage digitales
          </h1>
          <p style={{ maxWidth: 860, lineHeight: 1.6 }}>
            Positionnez la solution « écran étiquetage » comme l’alternative zéro papier pour les enseignes de proximité et les
            grandes surfaces. Ce plan associe deux audiences : <strong>gestionnaires de magasins</strong> (étiquettes prix) et
            <strong> commerçants premium</strong> (écrans promotionnels). Chaque publication comporte un hook, un copywriting en
            français, des idées créatives, un CTA orienté conversion et un prompt en anglais pour générer visuels et vidéos.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 24 }}>
            <div style={{ background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 12px 30px rgba(16,24,40,0.08)' }}>
              <strong>{stats.posts}</strong> contenus planifiés sur 30 jours
            </div>
            <div style={{ background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 12px 30px rgba(16,24,40,0.08)' }}>
              <strong>{stats.hooks}</strong> accroches uniques pour capter chaque audience
            </div>
            <a
              href={downloadHref}
              style={{
                background: '#0e7bff',
                color: '#fff',
                padding: '16px 24px',
                borderRadius: 12,
                fontWeight: 600,
                boxShadow: '0 12px 30px rgba(14,123,255,0.3)'
              }}
              download
            >
              Télécharger le fichier Excel
            </a>
          </div>
        </section>

        <section style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {platforms.map((platform) => (
              <button
                key={platform.key}
                type="button"
                onClick={() => setPlatformKey(platform.key)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 999,
                  border: '1px solid',
                  borderColor: platformKey === platform.key ? '#0e7bff' : '#d0d5dd',
                  background: platformKey === platform.key ? '#e7f1ff' : '#fff',
                  color: '#101828',
                  cursor: 'pointer',
                  boxShadow: platformKey === platform.key ? '0 8px 16px rgba(14,123,255,0.2)' : 'none',
                  fontWeight: 600
                }}
              >
                {platform.label}
              </button>
            ))}
          </div>
          <p style={{ marginTop: 16, maxWidth: 720, lineHeight: 1.5 }}>
            {platforms.find((item) => item.key === platformKey)?.description}
          </p>
        </section>

        <section>
          <div
            style={{
              overflowX: 'auto',
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 24px 60px rgba(16,24,40,0.1)',
              padding: 24
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 960 }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid #e4e7ec' }}>
                  <th style={{ padding: '12px 8px', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>Jour</th>
                  <th style={{ padding: '12px 8px', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>Date</th>
                  <th style={{ padding: '12px 8px', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>Horaire</th>
                  <th style={{ padding: '12px 8px', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>Thématique</th>
                  <th style={{ padding: '12px 8px', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>Hook</th>
                  <th style={{ padding: '12px 8px', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>Copywriting</th>
                  <th style={{ padding: '12px 8px', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>Idée visuel</th>
                  <th style={{ padding: '12px 8px', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>Idée vidéo / reel</th>
                  <th style={{ padding: '12px 8px', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>CTA</th>
                  <th style={{ padding: '12px 8px', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>Idée témoignage</th>
                  <th style={{ padding: '12px 8px', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>Prompt (EN)</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={`${post.jour}-${index}`} style={{ borderBottom: '1px solid #f2f4f7', verticalAlign: 'top' }}>
                    <td style={{ padding: '16px 8px', fontWeight: 600 }}>{post.jour}</td>
                    <td style={{ padding: '16px 8px' }}>{post.date}</td>
                    <td style={{ padding: '16px 8px' }}>{post.horaire}</td>
                    <td style={{ padding: '16px 8px', fontWeight: 500 }}>{post.thematique}</td>
                    <td style={{ padding: '16px 8px' }}>{post.accroche}</td>
                    <td style={{ padding: '16px 8px', whiteSpace: 'pre-line' }}>{post.copywriting}</td>
                    <td style={{ padding: '16px 8px' }}>{post.ideeVisuel}</td>
                    <td style={{ padding: '16px 8px' }}>{post.ideeVideo}</td>
                    <td style={{ padding: '16px 8px' }}>{post.cta}</td>
                    <td style={{ padding: '16px 8px' }}>{post.ideeTemoignage}</td>
                    <td style={{ padding: '16px 8px', fontFamily: 'monospace', fontSize: 13 }}>{post.prompt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
