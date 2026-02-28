import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

const targetCourses = [
  {
    title: "Full Course - All",
    description: "Includes: Notes, Video Lectures + 2500+ MCQ Book + Free MV Act MCQ Book",
    price: 1149,
    oldPrice: 1999,
    paymentLink: "https://payments.cashfree.com/forms?code=jkssbfullcourse&formId=FULLCOURSE",
    duration: "Full Access",
    category: "Complete Package",
    rank: 1,
    syllabus: `Part I - Traffic Rules & Signalling:
Traffic Police hand signals
Basic Road Rules, driving methods, speed limits
Hand signals while driving
Traffic light signals
Road map reading
Traffic signages for road safety
Fitness to drive
First aid kit
Good health & Road safety

Part II - MV Act 1988 & CMV Rules 1989:
Basic knowledge of Motor Vehicle Act provisions
Documents required for driving & offences
Registration, Licensing, Insurance

Part III - Motor Parts & Repair:
Identification of major vehicle assemblies
Daily & periodic inspection
Tyre fault diagnosis & changing
Fuel pump, clutch, brake working & air bleeding
Lubrication grades (engine, transmission, differential, suspension)
Servicing schedule & service centres
Different starting methods
Dashboard symbols`
  },
  {
    title: "Part I",
    description: "Includes: Traffic Rules & Signalling",
    price: 449,
    oldPrice: 899,
    paymentLink: "https://payments.cashfree.com/forms?code=jkssbcourse&formId=PART1",
    duration: "Full Access",
    category: "Traffic Rules",
    rank: 2,
    syllabus: `Traffic Police hand signals
Basic Road Rules, driving methods, speed limits
Hand signals while driving
Traffic light signals
Road map reading
Traffic signages for road safety
Fitness to drive, First aid kit
Good health & Road safety
Driving under influence of drugs/liquor
Difficult driving conditions
Driving on wet surface, in fog, at night
Running on pavement, Brake failure, Towing
Vehicle pollution knowledge (Do's & Don'ts)`
  },
  {
    title: "Part II",
    description: "Includes: MV Act 1988 & CMV Rules 1989",
    price: 299,
    oldPrice: 499,
    paymentLink: "https://payments.cashfree.com/forms?code=jkssbcoursePART2&formId=PART2",
    duration: "Full Access",
    category: "MV Act",
    rank: 3,
    syllabus: `Basic knowledge of Motor Vehicle Act provisions
Documents required for driving & offences
Registration
Licensing
Insurance`
  },
  {
    title: "Part III",
    description: "Includes: Motor Parts & Repair",
    price: 449,
    oldPrice: 899,
    paymentLink: "https://payments.cashfree.com/forms?code=jkssbcoursepart3&formId=PART3",
    duration: "Full Access",
    category: "Mechanical",
    rank: 4,
    syllabus: `Identification of major vehicle assemblies
Daily & periodic inspection knowledge
Tyre fault diagnosis & changing procedure
Fuel pump, clutch, brake working & air bleeding
Lubrication grades (engine, transmission, differential, suspension)
Servicing schedule & service centre locations
Different starting methods
Dashboard symbols knowledge`
  },
  {
    title: "MV Act 1988 MCQ Book",
    description: "Includes: Complete MV Act 1988 & CMV Rules 1989 MCQ Book — 300+ updated MCQs with amendments",
    price: 199,
    oldPrice: 299,
    paymentLink: "https://payments.cashfree.com/forms?code=jkssbcoursemvact&formId=MVACT",
    duration: "Full Access",
    category: "Complete Package",
    rank: 5,
    syllabus: `300+ updated MCQs
Amendments included
Most important MCQs for JKSSB`
  },
  {
    title: "MCQ Book — Full Syllabus Covered ⭐ NEW",
    description: "Includes: 2500+ MCQs with answers, full JKSSB syllabus coverage",
    price: 299,
    oldPrice: 499,
    paymentLink: "https://payments.cashfree.com/forms?code=MCQBOOK",
    duration: "Full Access",
    category: "Complete Package",
    rank: 6,
    syllabus: `Most expected JKSSB questions
Full syllabus coverage
2500+ MCQs with answers`
  },
  {
    title: "Old Driver Papers ⭐ NEW",
    description: "Includes: JKSSB and other boards previous Driver exam papers",
    price: 19,
    oldPrice: 49,
    paymentLink: "https://payments.cashfree.com/forms?code=OldDriverPapers",
    duration: "Full Access",
    category: "Complete Package",
    rank: 7,
    syllabus: `Previous year JKSSB Driver papers
Other boards Driver papers included`
  }
];

async function seedData() {
  const logDiv = document.getElementById('log');
  const log = (msg: string) => {
    console.log(msg);
    if (logDiv) logDiv.innerHTML += `<p>${msg}</p>`;
  };

  try {
    log("Fetching existing courses...");
    const snapshot = await getDocs(collection(db, 'courses'));
    const existing = snapshot.docs.map(d => ({ id: d.id, ...(d.data() as any) }));

    for (const target of targetCourses) {
      // Find matching course by title, ignoring " ⭐ NEW" on either side just in case
      let match = existing.find(e =>
        e.title === target.title ||
        e.title.replace(' ⭐ NEW', '') === target.title.replace(' ⭐ NEW', '')
      );

      const payload = {
        title: target.title,
        description: target.description,
        price: target.price,
        oldPrice: target.oldPrice,
        paymentLink: target.paymentLink,
        duration: target.duration,
        category: target.category,
        rank: target.rank,
        syllabus: target.syllabus,
        pdfIds: match?.pdfIds || [],
        practiceTestIds: match?.practiceTestIds || [],
        updatedAt: serverTimestamp()
      };

      if (match) {
        log(`Updating existing course: ${target.title}`);
        await updateDoc(doc(db, 'courses', match.id), payload);
      } else {
        log(`Creating new course: ${target.title}`);
        await addDoc(collection(db, 'courses'), { ...payload, createdAt: serverTimestamp() });
      }
    }
    log("✅ All courses seeded/updated successfully!");
    localStorage.removeItem('jkssb_courses_cache');
    log("Cache cleared. You can now close this page.");
  } catch (err: any) {
    log(`❌ Error: ${err.message}`);
  }
}

seedData();
