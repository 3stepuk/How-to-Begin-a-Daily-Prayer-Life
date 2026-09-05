import React from 'react';
import { Printer, Bookmark, ArrowLeft } from 'lucide-react';
import { ActiveTab } from '../types';

interface PrintablePocketGuideProps {
  onBackToGuide: () => void;
}

export const PrintablePocketGuide: React.FC<PrintablePocketGuideProps> = ({
  onBackToGuide
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Top action bar (hidden during print) */}
      <div className="no-print flex items-center justify-between mb-8 pb-4 border-b border-[#E8DFC8]">
        <button
          onClick={onBackToGuide}
          className="flex items-center gap-1.5 text-xs font-serif text-[#6B5E59] hover:text-[#2C2523] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Full Guide</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#7C2D2D] hover:bg-[#682424] text-[#FAF7F2] font-serif text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF Pocket Rule</span>
        </button>
      </div>

      <div className="no-print text-center mb-6">
        <span className="text-xs uppercase font-cinzel tracking-widest text-[#7C2D2D] font-bold block mb-1">
          Pocket Rule of Life
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2C2523]">
          Printable Folding Guide
        </h2>
        <p className="text-xs font-serif text-[#6B5E59] italic mt-1">
          Designed to be printed on standard paper, cut or folded to keep in your Bible, Missal, or nightstand.
        </p>
      </div>

      {/* The Printable Card Canvas */}
      <div className="bg-white border-2 border-[#D8CEB8] rounded-xl p-8 sm:p-10 shadow-sm print:border print:border-black print:p-6 print:shadow-none print:m-0 text-[#1F1917]">
        
        {/* Header with Liturgical Cross */}
        <div className="text-center border-b-2 border-[#7C2D2D] pb-5 mb-6">
          <div className="text-xl font-serif text-[#7C2D2D] mb-1">†</div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#2C2523]">
            How to Begin a Daily Prayer Life
          </h1>
          <p className="font-cinzel text-xs tracking-widest uppercase text-[#7C2D2D] font-bold mt-1">
            Pastoral Counsel by Father John
          </p>
        </div>

        {/* Foundational Rule */}
        <div className="bg-[#FAF7F2] border border-[#E8DFC8] p-4 rounded-lg mb-6 text-center italic font-serif text-sm text-[#4A3E39] print:bg-white print:border-gray-300">
          "A good prayer life is built not through dramatic experiences, but through small and steady habits. It is better to pray simply every day than to attempt too much and quickly give up."
        </div>

        {/* Two-Column Grid: Fixed Times & Daily Rule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-xs font-serif leading-relaxed">
          
          {/* Column 1: The Four Daily Anchors */}
          <div className="space-y-4">
            <h2 className="font-cinzel font-bold text-xs uppercase tracking-wider text-[#7C2D2D] border-b border-[#EAE1D2] pb-1">
              The Four Daily Anchors
            </h2>

            <div>
              <span className="font-bold text-[#2C2523]">1. Morning Prayer (After Waking)</span>
              <p className="text-[#554A45] mt-0.5">
                Make the Sign of the Cross carefully. Offer your works, joys, and sufferings of the day to God before touching your phone.
              </p>
            </div>

            <div>
              <span className="font-bold text-[#2C2523]">2. Grace Before Meals</span>
              <p className="text-[#554A45] mt-0.5">
                Pause before eating to acknowledge the Lord who gives daily bread and sustenance.
              </p>
            </div>

            <div>
              <span className="font-bold text-[#2C2523]">3. Midday Pause / Angelus</span>
              <p className="text-[#554A45] mt-0.5">
                Recite the Angelus or take two quiet minutes to remember Christ in the midst of daily work.
              </p>
            </div>

            <div>
              <span className="font-bold text-[#2C2523]">4. Night Prayer (Before Sleep)</span>
              <p className="text-[#554A45] mt-0.5">
                Spend a few moments in silence. Give thanks for the day, make an Act of Contrition, and commend your soul to God.
              </p>
            </div>

            <div>
              <span className="font-bold text-[#7C2D2D]">★ Sunday Mass as the Centre</span>
              <p className="text-[#554A45] mt-0.5">
                The source and summit of the week, uniting our humble prayers with Christ's sacrifice.
              </p>
            </div>
          </div>

          {/* Column 2: Golden Principles for the Soul */}
          <div className="space-y-4">
            <h2 className="font-cinzel font-bold text-xs uppercase tracking-wider text-[#7C2D2D] border-b border-[#EAE1D2] pb-1">
              Spiritual Principles
            </h2>

            <div>
              <span className="font-bold text-[#2C2523]">Begin Simply</span>
              <p className="text-[#554A45] mt-0.5">
                Do not attempt monastic schedules. Even five or ten faithful minutes each day can become the beginning of a genuine spiritual life.
              </p>
            </div>

            <div>
              <span className="font-bold text-[#2C2523]">Sit Quietly Before God</span>
              <p className="text-[#554A45] mt-0.5">
                Prayer is not only speaking. Sometimes the most fruitful prayer is simply remaining quietly in His presence.
              </p>
            </div>

            <div>
              <span className="font-bold text-[#2C2523]">Handling Distractions</span>
              <p className="text-[#554A45] mt-0.5">
                Do not fight distractions with anger. Gently and calmly bring your gaze back to Christ. Fidelity matters more than strong feelings.
              </p>
            </div>

            <div>
              <span className="font-bold text-[#2C2523]">Do Not Be Discouraged</span>
              <p className="text-[#554A45] mt-0.5">
                Prayer is often growing precisely when it feels hidden, ordinary, and dry. The important thing is to continue.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Core Prayers Strip */}
        <div className="border-t-2 border-[#EAE1D2] pt-6 space-y-4 text-xs font-serif">
          <h2 className="font-cinzel font-bold text-xs uppercase tracking-wider text-[#7C2D2D] text-center">
            Treasury of Foundation Prayers
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#FAF7F2] p-3 rounded border border-[#E8DFC8] print:bg-white print:border-gray-300">
              <span className="font-bold block text-[#2C2523] mb-1">Sign of the Cross</span>
              <p className="italic text-[#554A45] text-[11px]">
                In the name of the Father, and of the Son, and of the Holy Spirit. Amen.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-3 rounded border border-[#E8DFC8] print:bg-white print:border-gray-300">
              <span className="font-bold block text-[#2C2523] mb-1">Morning Offering</span>
              <p className="italic text-[#554A45] text-[11px]">
                O Jesus, through the Immaculate Heart of Mary, I offer You my prayers, works, joys, and sufferings of this day...
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-3 rounded border border-[#E8DFC8] print:bg-white print:border-gray-300">
              <span className="font-bold block text-[#2C2523] mb-1">Act of Contrition</span>
              <p className="italic text-[#554A45] text-[11px]">
                O my God, I am heartily sorry for having offended Thee... and I firmly resolve, with the help of Thy grace, to sin no more.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Benediction */}
        <div className="mt-8 pt-4 border-t border-[#EAE1D2] text-center">
          <p className="font-display italic text-sm text-[#7C2D2D]">
            "Begin modestly, remain faithful, and allow the Lord to deepen your prayer little by little."
          </p>
        </div>

      </div>
    </div>
  );
};
