// StoragePage — the detail page for a storage device entry.
// Reached by clicking a storage card on the homepage timeline (/storage/:id).
//
// There are only two storage entries:
//   s1 — IBM Direct Access Storage Devices (single device, one image)
//   s2 — DEC Digital Storage Architecture (a collection of 7 devices)
//
// The s2 entry is more complex: it displays multiple device sub-sections, each with
// an image, description, and a disk-label config code block showing the actual BSD
// disk descriptor strings that were used to configure these drives on the VAX systems.
//
// All descriptive text comes from the translation file under `storagePage.storages.*`.
// The code strings (code1–code7) are stored directly in `storageBaseData` because they
// are historical technical data, not user-facing content that needs translation.

import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './StoragePage.css'

// Static data for each storage entry.
// s2 holds multiple images/titles/codes because it covers a whole product family.
const storageBaseData = [
  {
    id: "s1",
    name: "IBM Direct Access Storage Devices",
    year: "1978",
    image: "/images/IBM 3370.jpg",
  },
  {
    id: "s2",
    name: "DEC Digital Storage Architecture",
    year: "1982",
    // Seven devices in the DEC storage family, each with its own image, title and BSD disk label
    image1: "/images/RL02.jpg",
    image2: "/images/RA60.jpg",
    image3: "/images/RA80.jpg",
    image4: "/images/RA81.jpg",
    image5: "/images/TU80.jpg",
    image6: "/images/TU81_Plus.png",
    image7: "/images/TS05.jpg",
    title1: "DEC removable media RL02",
    title2: "DEC Winchester RA60",
    title3: "DEC Winchester RA80",
    title4: "DEC Winchester RA81",
    title5: "DEC Tape System TU80",
    title6: "DEC Tape System TU81 Plus",
    title7: "DEC Tape System TS05",
    // Actual BSD disk label configuration strings from the department's systems
    code1: "rb02|RB02|DEC RL02 on 730 IDC:\\ \n\t :ty=removable:se#256:ns#40:nt#2:nc#32:\\ \n\t :pa#15884:ba#4096:fa#1024:\\ \n\t :pb#4480:pc#20480:",
    code2: "ra60|RA60|DEC RA60 Removable:\\ \n\t :ty=removable:ns#42:nt#4:nc#2382:\\ \n\t :pa#15884:ba#8192:fa#1024:\\ \n\t :pb#33440:pc#400176:\\ \n\t :pg#82080:bg#4096:fg#512:\\ \n\t :ph#268772:bh#4096:fh#1024: ",
    code3: "a80|RA80|DEC RA80 Winchester:\\ \n\t :ty=winchester:ns#31:nt#14:nc#559:\\ \n\t :pa#15884:ba#8192:fa#1024:\\ \n\t :pb#33440:pc#242606:\\ \n\t :pg#82080:bg#4096:fg#512:\\ \n\t :ph#111202:bh#4096:fh#1024:",
    code4: "#\n# UCB RA81: use a-b-h-g or a-b-h-d-e-f \n\t ucbra81|UCBRA81|DEC UCBRA81 Winchester:\\ \n\t :ty=winchester:ns#51:nt#14:nc#1248:\\ \n\t :dt=MSCP:\\ \n\t :pa#15884:oa#0:ba#8192:fa#1024:\\ \n\t :pb#33440:ob#15884:bb#4096:fb#512:tb=swap:\\ \n\t :pc#891072:oc#0:bc#8192:fc#1024:\\ \n\t :pd#15884:od#242606:bd#4096:fd#512:\\ \n\t :pe#307200:oe#258490:be#8192:fe#1024:\\ \n\t :pf#325382:of#565690:bf#4096:ff#512:\\ \n\t :pg#648466:og#242606:bg#4096:fg#1024:\\ \n\t :ph#193282:oh#49324:bh#4096:fh#512:",
  },
]

function StoragePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const storage = storageBaseData.find((s) => s.id === id)

  // Redirect to home if the storage id is not recognised
  useEffect(() => {
    if (!storage) {
      navigate('/')
    }
  }, [storage, navigate])

  if (!storage) return null

  return (
    <div className="storage-page">

      {/* Fixed back button */}
      <button className="storage-back-btn" onClick={() => navigate('/')}>
        ←
      </button>

      <div className="storage-header">
        <div>
          {/* Only s1 shows a single hero image in the header */}
          {storage.id === 's1' && (
            <img src={storage.image} className="machine-image" />
          )}
        </div>
        <div className="storage-title-section">
          <div className="storage-name">{storage.name}</div>
          <div className="storage-year">{storage.year}</div>
        </div>
      </div>

      <div className="storage-divider"></div>

      {/* s1: simple layout — one description paragraph */}
      {storage.id === 's1' && (
        <p className="storage-history">{t('storagePage.storages.s1.history')}</p>
      )}

      {/* s2: complex layout — one sub-section per device in the DEC family */}
      {storage.id === 's2' && (
        <div>
          {/* RL02 */}
          <div className="storage-DEC-header">
            <div><img src={storage.image1} className="machine-image" /></div>
            <div className="storage-title-section">
              <div className="storage-name">{storage.title1}</div>
            </div>
          </div>
          <p className="DEC-history">{t('storagePage.storages.s2.history1')}</p>
          {/* BSD disk label config string for RL02 */}
          <div className="code-block"><p>{storage.code1}</p></div>

          {/* RA60 */}
          <div className="storage-DEC-header">
            <div><img src={storage.image2} className="machine-image" /></div>
            <div className="storage-title-section">
              <div className="storage-name">{storage.title2}</div>
            </div>
          </div>
          <p className="DEC-history">{t('storagePage.storages.s2.history2')}</p>
          <div className="code-block"><p>{storage.code2}</p></div>

          {/* RA80 */}
          <div className="storage-DEC-header">
            <div><img src={storage.image3} className="machine-image" /></div>
            <div className="storage-title-section">
              <div className="storage-name">{storage.title3}</div>
            </div>
          </div>
          <p className="DEC-history">{t('storagePage.storages.s2.history3')}</p>
          <div className="code-block"><p>{storage.code3}</p></div>

          {/* RA81 */}
          <div className="storage-DEC-header">
            <div><img src={storage.image4} className="machine-image" /></div>
            <div className="storage-title-section">
              <div className="storage-name">{storage.title4}</div>
            </div>
          </div>
          <p className="DEC-history">{t('storagePage.storages.s2.history4')}</p>
          <div className="code-block"><p>{storage.code4}</p></div>

          {/* TU80 — tape drives have no disk label code */}
          <div className="storage-DEC-header">
            <div><img src={storage.image5} className="machine-image" /></div>
            <div className="storage-title-section">
              <div className="storage-name">{storage.title5}</div>
            </div>
          </div>
          <p className="DEC-history">{t('storagePage.storages.s2.history5')}</p>

          {/* TU81 Plus */}
          <div className="storage-DEC-header">
            <div><img src={storage.image6} className="machine-image" /></div>
            <div className="storage-title-section">
              <div className="storage-name">{storage.title6}</div>
            </div>
          </div>
          <p className="DEC-history">{t('storagePage.storages.s2.history6')}</p>

          {/* TS05 */}
          <div className="storage-DEC-header">
            <div><img src={storage.image7} className="machine-image" /></div>
            <div className="storage-title-section">
              <div className="storage-name">{storage.title7}</div>
            </div>
          </div>
          <p className="DEC-history">{t('storagePage.storages.s2.history7')}</p>
        </div>
      )}

    </div>
  )
}

export default StoragePage
