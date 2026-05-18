// InternetPage — two sections on a single page:
//
//   1. Internet History Timeline (top)
//      A horizontally scrollable timeline similar to the homepage, but for internet
//      milestones at the CSD / UoC (1984–1995).
//      - `baseTimeline` holds the years and image file paths (static data).
//      - Text events and image captions come from the translation file
//        under `internetPage.timeline.<index>.*`.
//      - Images are merged with their translated captions at render time.
//      - The 1984 email image has a hover overlay showing the actual email text
//        (hardcoded here because it's a historical document, not a translation).
//
//   2. People Section (below the timeline)
//      Profiles of professors, infrastructure staff, and students who contributed
//      to connecting the university to the internet.
//      - `professorIds` and `infrastructureIds` are the lookup keys for translation.
//      - `PersonCard` is a small sub-component to avoid repeating card markup.

import { useTranslation } from 'react-i18next'
import './InternetPage.css'
import Sidebar from '../components/Sidebar'

// IDs must match keys in the translation file under peoplePage.professors.*
const professorIds = ["orfanoudakis", "katevenis", "kourkoumpetis", "sartzekakis", "stamoulis", "syris", "traganitis"]
// IDs must match keys in the translation file under peoplePage.infrastructure.*
const infrastructureIds = ["tzortzakis", "fragkiadakis", "vitsakis", "vassiliou"]

type PersonData = {
  name: string
  role: string
  contributions: string[]
  highlight: string
}

// Reusable card component for both professors and infrastructure staff
function PersonCard({ person }: { person: PersonData }) {
  return (
    <div className="people-card">
      <div className="people-card-header">
        <div>
          <h3 className="people-name">{person.name}</h3>
          <p className="people-role">{person.role}</p>
        </div>
      </div>
      <div className="people-contributions">
        {person.contributions.map((c, i) => (
          <p key={i} className="people-contribution">- {c}</p>
        ))}
      </div>
      <div className="people-highlight">
        <p>{person.highlight}</p>
      </div>
    </div>
  )
}

type TimelineImage = {
  src: string
  id: string
}

// Static image data — years with no images use empty arrays.
// Empty-year entries ("") are visual spacers in the timeline layout.
// Image IDs are referenced by CSS for per-image size overrides (#image-1989, #image-1991).
const baseTimeline = [
  { year: "1984",      images: [] },
  { year: "1985",      images: [] },
  { year: "1989",      images: [] },
  { year: "",      images: [{ src: import.meta.env.BASE_URL + 'images/internet/1989.png',        id: "image-1989" }] },
  { year: "1990",      images: [] },
  { year: "1991",      images: [] },
  { year: "",          images: [] },
  { year: "",          images: [{ src: import.meta.env.BASE_URL + 'images/internet/1991.png',        id: "image-1991" }] },
  { year: "",          images: [] },
  { year: "1992",      images: [] },
  {year:  "1993",        images:[]},
  { year: "1994",      images: [] },
  { year: "",          images: [] },
  { year: "1995",      images: [] },
]

function InternetPage() {
  const { t } = useTranslation()

  // Merge each timeline entry's static image paths with translated captions
  const historyTimeline = baseTimeline.map((entry, index) => {
    const events = t(`internetPage.timeline.${index}.events`, { returnObjects: true }) as string[]
    const captionKeys = t(`internetPage.timeline.${index}.images`, { returnObjects: true }) as { caption: string }[]
    const images = entry.images.map((img: TimelineImage, imgIndex: number) => ({
      ...img,
      caption: captionKeys[imgIndex]?.caption ?? '',
    }))
    return { ...entry, events, images }
  })

  // Build professor and infrastructure card data from translation keys
  const professors = professorIds.map((id) => ({
    name:          t(`peoplePage.professors.${id}.name`),
    role:          t(`peoplePage.professors.${id}.role`),
    contributions: t(`peoplePage.professors.${id}.contributions`, { returnObjects: true }) as string[],
    highlight:     t(`peoplePage.professors.${id}.highlight`),
  }))

  const infrastructure = infrastructureIds.map((id) => ({
    name:          t(`peoplePage.infrastructure.${id}.name`),
    role:          t(`peoplePage.infrastructure.${id}.role`),
    contributions: t(`peoplePage.infrastructure.${id}.contributions`, { returnObjects: true }) as string[],
    highlight:     t(`peoplePage.infrastructure.${id}.highlight`),
  }))

  // Students is a plain string array in the translation file
  const students = t('peoplePage.students', { returnObjects: true }) as string[]

  return (
    <div className="internet-page">
      <Sidebar />

      <h1 className="internet-title">{t('internetPage.title')}</h1>

      <div className="internet-container">
        <div className="internet-wrapper">

        {/* Row 1: Events and images above the timeline line */}
        <div className="internet-scroll">
          {historyTimeline.map((entry, index) => (
            <div className="internet-column" key={index}>
              {/* The 1984 column is shifted right slightly so the email image clears the sidebar */}
              <div className="internet-events" style={{ position: 'relative', left: entry.year === "1984" ? "50px" : "0px" }}>

                {entry.events.map((event, i) => (
                  <p key={i} className="internet-event">- {event}</p>
                ))}
                 {entry.year === "1984" && (
                <div className="year-1984-events">
                  {<p>
                    Dear Friends and Colleagues,
                     <br></br>Ariadne, the VAX-11/780 at the Computer Science 
                     <br></br>Institute of the Cretan Research Center ,
                     <br></br>Iraklio, Kriti, is now on the UUCP 
                     <br></br>network, exchanging 
                     <br></br>mail and news. The proceeding message 
                     <br></br>is the reply that I received to a message that 
                     <br></br>I had sent to "postmaster" there.
                     <br></br>Communication is via "ncvax", a machine in the
                     <br></br>Netherlands which connects to 
                     <br></br>(at least) "decvax" on the East Coast of USA. 
                     <br></br>Thus, you can send mail to Kriti using 
                     <br></br>an address of the type:  
                     <br></br>decvax!mcvax!ariadne!LOGIN-NAME
                     <br></br>or mcvax!ariadne!LOGIN-NAME@decvax
                     <br></br>or berkeley!decvax!mcvax!ariadne!LOGIN-NAME
                     <br></br>or ucbvax!decvax!mcvax!ariadne!LOGIN-NAME
                     <br></br>or decvax!mcvax!ariadne!LOGIN-NAME@berkeley
                     <br></br>or variations thereof.
                     <br></br>Manolis Katevenis
                     <br></br>ucbvax!kateveni 
                     </p>}
                </div>
                )}
                {entry.images.map((img, i) => (
                  <div key={i} className="internet-image-container" >
                    <div className="image-hover-container">
                    <img src={img.src} alt={img.caption} className="internet-image" id={img.id} />
                    <p className="internet-image-caption">{img.caption}</p>
                  </div>
                </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Line */}
        <div className="internet-line"></div>

        {/* Row 2: Year labels below the line */}
        <div className="internet-scroll">
          {historyTimeline.map((entry, index) => (
            // Index 5 is the "" spacer column that holds the 1991 image — shift its label right
            <div className="internet-column" key={index} style={{ position: 'relative', left: index === 5 ? "740px" : "0px" }}>
              <div className="internet-year-label">{entry.year}</div>
            </div>
          ))}
        </div>

        </div>{/* /internet-wrapper */}
      </div>

      {/* People section — professors, infrastructure, and student contributors */}
      <div className="people-wrapper">

        <div className="people-intro">
          <h1 className="people-title">{t('peoplePage.title')}</h1>
          <p className="people-intro-text">{t('peoplePage.introText')}</p>
        </div>

        <div className="people-section">
          <h2 className="people-section-title">
            <span className="people-section-line"></span>
            {t('peoplePage.professorsTitle')}
            <span className="people-section-line"></span>
          </h2>
          <div className="people-grid">
            {professors.map((p) => (
              <PersonCard key={p.name} person={p} />
            ))}
          </div>
        </div>

        <div className="people-section">
          <h2 className="people-section-title">
            <span className="people-section-line"></span>
            {t('peoplePage.infrastructureTitle')}
            <span className="people-section-line"></span>
          </h2>
          <div className="people-grid">
            {infrastructure.map((p) => (
              <PersonCard key={p.name} person={p} />
            ))}
          </div>
        </div>

        <div className="people-section">
          <h2 className="people-section-title">
            <span className="people-section-line"></span>
            {t('peoplePage.studentsTitle')}
            <span className="people-section-line"></span>
          </h2>
          <p className="people-students-intro">{t('peoplePage.studentsIntro')}</p>
          <div className="people-students-grid">
            {students.map((s, i) => (
              <div key={i} className="people-student">{s}</div>
            ))}
          </div>
          <p className="people-students-note">{t('peoplePage.studentsNote')}</p>
        </div>

        <div className="people-conclusion">
          <p>{t('peoplePage.conclusion')}</p>
        </div>

      </div>
    </div>
  )
}

export default InternetPage
