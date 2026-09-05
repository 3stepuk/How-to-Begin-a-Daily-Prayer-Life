import { PrayerItem } from '../types';

export const PRAYER_TREASURY: PrayerItem[] = [
  {
    id: "sign-of-the-cross",
    title: "The Sign of the Cross",
    latinTitle: "Signum Crucis",
    category: "daily",
    shortDescription: "The ancient seal and dedication of all Catholic prayer, touching forehead, breast, and shoulders.",
    textEnglish: `In the name of the Father,
and of the Son,
and of the Holy Spirit.
Amen.`,
    textLatin: `In nomine Patris,
et Filii,
et Spiritus Sancti.
Amen.`,
    instructions: "Make the Sign of the Cross carefully and unhurriedly each morning upon waking, and before and after any prayer.",
    traditionalTime: "Morning & Anytime"
  },
  {
    id: "our-father",
    title: "The Lord's Prayer (Our Father)",
    latinTitle: "Pater Noster",
    category: "daily",
    shortDescription: "The perfect prayer taught directly by our Lord Jesus Christ in the Gospel of Matthew.",
    textEnglish: `Our Father, who art in heaven,
hallowed be Thy name;
Thy kingdom come;
Thy will be done
on earth as it is in heaven.
Give us this day our daily bread;
and forgive us our trespasses
as we forgive those who trespass against us;
and lead us not into temptation,
but deliver us from evil.
Amen.`,
    textLatin: `Pater noster, qui es in caelis,
sanctificetur nomen tuum.
Adveniat regnum tuum.
Fiat voluntas tua,
sicut in caelo et in terra.
Panem nostrum quotidianum da nobis hodie,
et dimitte nobis debita nostra
sicut et nos dimittimus debitoribus nostris.
Et ne nos inducas in tentationem,
sed libera nos a malo.
Amen.`,
    traditionalTime: "Morning, Mass, Evening"
  },
  {
    id: "hail-mary",
    title: "The Hail Mary",
    latinTitle: "Ave Maria",
    category: "marian",
    shortDescription: "Combining the greetings of the Archangel Gabriel and St. Elizabeth with the Church's supplication.",
    textEnglish: `Hail Mary, full of grace,
the Lord is with thee;
blessed art thou amongst women,
and blessed is the fruit of thy womb, Jesus.
Holy Mary, Mother of God,
pray for us sinners,
now and at the hour of our death.
Amen.`,
    textLatin: `Ave Maria, gratia plena,
Dominus tecum;
benedicta tu in mulieribus,
et benedictus fructus ventris tui, Iesus.
Sancta Maria, Mater Dei,
ora pro nobis peccatoribus,
nunc et in hora mortis nostrae.
Amen.`,
    traditionalTime: "Throughout the Day & Rosary"
  },
  {
    id: "glory-be",
    title: "The Glory Be (Doxology)",
    latinTitle: "Gloria Patri",
    category: "daily",
    shortDescription: "The timeless hymn of adoration giving eternal praise to the Most Holy Trinity.",
    textEnglish: `Glory be to the Father,
and to the Son,
and to the Holy Spirit.
As it was in the beginning,
is now, and ever shall be,
world without end.
Amen.`,
    textLatin: `Gloria Patri, et Filio, et Spiritui Sancto.
Sicut erat in principio,
et nunc, et semper,
et in saecula saeculorum.
Amen.`,
    traditionalTime: "End of Psalms & Rosary Decades"
  },
  {
    id: "morning-offering",
    title: "Morning Offering",
    latinTitle: "Oblatio Matutina",
    category: "daily",
    shortDescription: "Sanctifying every thought, word, joy, and sorrow of the coming day for God's glory.",
    textEnglish: `O Jesus, through the Immaculate Heart of Mary,
I offer You my prayers, works, joys, and sufferings of this day,
for all the intentions of Your Sacred Heart,
in union with the Holy Sacrifice of the Mass throughout the world,
for the salvation of souls, the reparation of sins,
the reunion of all Christians,
and in particular for the intentions of the Holy Father this month.
Amen.`,
    instructions: "Pray this shortly after rising from sleep to transform your daily work and duties into continuous worship.",
    traditionalTime: "Morning"
  },
  {
    id: "the-angelus",
    title: "The Angelus",
    latinTitle: "Angelus Domini",
    category: "marian",
    shortDescription: "Commemorating the Incarnation of Christ, traditionally recited at morning (6am), noon (12pm), and evening (6pm).",
    textEnglish: `V. The Angel of the Lord declared unto Mary.
R. And she conceived of the Holy Spirit.

Hail Mary, full of grace, the Lord is with thee; blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.

V. Behold the handmaid of the Lord.
R. Be it done unto me according to Thy word.

Hail Mary...

V. And the Word was made flesh.
R. And dwelt among us.

Hail Mary...

V. Pray for us, O holy Mother of God.
R. That we may be made worthy of the promises of Christ.

Let us pray:
Pour forth, we beseech Thee, O Lord, Thy grace into our hearts; that we, to whom the Incarnation of Christ, Thy Son, was made known by the message of an Angel, may by His Passion and Cross be brought to the glory of His Resurrection. Through the same Christ our Lord.
Amen.`,
    textLatin: `V. Angelus Domini nuntiavit Mariae.
R. Et concepit de Spiritu Sancto.
Ave Maria...

V. Ecce ancilla Domini.
R. Fiat mihi secundum verbum tuum.
Ave Maria...

V. Et Verbum caro factum est.
R. Et habitavit in nobis.
Ave Maria...

V. Ora pro nobis, Sancta Dei Genetrix.
R. Ut digni efficiamur promissionibus Christi.

Oremus:
Gratiam tuam, quaesumus, Domine, mentibus nostris infunde; ut qui, Angelo nuntiante, Christi Filii tui incarnationem cognovimus, per passionem eius et crucem ad resurrectionis gloriam perducamur. Per eundem Christum Dominum nostrum.
Amen.`,
    traditionalTime: "6:00 AM • 12:00 PM • 6:00 PM"
  },
  {
    id: "rosary-decade",
    title: "One Decade of the Rosary",
    latinTitle: "Decas Rosarii",
    category: "marian",
    shortDescription: "Father John's recommendation for beginners: one mystery, one Our Father, ten Hail Marys, and one Glory Be.",
    textEnglish: `1. Name the Mystery:
   Choose one mystery of Christ's life (Joyful, Luminous, Sorrowful, or Glorious).
   For example: The Annunciation, or The Nativity, or The Resurrection.

2. Pray One Our Father:
   "Our Father, who art in heaven, hallowed be Thy name..."

3. Pray Ten Hail Marys:
   "Hail Mary, full of grace... and blessed is the fruit of thy womb, Jesus..."
   (Keep the mystery gently in mind as you repeat the words)

4. Pray One Glory Be:
   "Glory be to the Father, and to the Son, and to the Holy Spirit..."

5. Optional Fatima Prayer:
   "O My Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those most in need of Thy mercy."`,
    instructions: "Takes only 3 to 4 minutes. A gentle and profound way to walk with Mary contemplating her Son.",
    traditionalTime: "Daily"
  },
  {
    id: "grace-before-meals",
    title: "Grace Before Meals",
    latinTitle: "Benedictio Mensae",
    category: "daily",
    shortDescription: "Acknowledging God as the giver of all daily nourishment.",
    textEnglish: `Bless us, O Lord,
and these Thy gifts,
which we are about to receive from Thy bounty,
through Christ our Lord.
Amen.`,
    textLatin: `Benedic, Domine, nos
et haec tua dona,
quae de tua largitate sumus sumpturi.
Per Christum Dominum nostrum.
Amen.`,
    traditionalTime: "Before Breakfast, Lunch & Dinner"
  },
  {
    id: "night-prayer-examen",
    title: "Night Prayer & Act of Contrition",
    latinTitle: "Preces Nocturnae",
    category: "daily",
    shortDescription: "A short review of the day, giving thanks, seeking pardon for failures, and resting peacefully in God's mercy.",
    textEnglish: `1. Thanksgiving:
"Lord, I thank You for this day and for every gift received."

2. Gentle Review:
"Look back over the hours: Where did I love God and neighbor? Where was I impatient, selfish, or distracted?"

3. Act of Contrition:
O my God,
I am heartily sorry for having offended Thee,
and I detest all my sins because of Thy just punishments,
but most of all because they offend Thee, my God,
who art all good and deserving of all my love.
I firmly resolve, with the help of Thy grace,
to sin no more and to avoid the near occasions of sin.
Amen.

4. Into Your Hands:
"Into your hands, Lord, I commend my spirit. Keep me safe through this night. Amen."`,
    traditionalTime: "Before Sleep"
  },
  {
    id: "psalm-23",
    title: "Psalm 23: The Lord is My Shepherd",
    latinTitle: "Dominus Regit Me",
    category: "psalms",
    shortDescription: "The beloved psalm of peaceful trust, guidance, and spiritual rest.",
    textEnglish: `The Lord is my shepherd; I shall not want.
He makes me lie down in green pastures.
He leads me beside still waters.
He restores my soul.
He leads me in paths of righteousness for his name's sake.

Even though I walk through the valley of the shadow of death,
I will fear no evil,
for you are with me;
your rod and your staff, they comfort me.

You prepare a table before me
in the presence of my enemies;
you anoint my head with oil;
my cup overflows.
Surely goodness and mercy shall follow me all the days of my life,
and I shall dwell in the house of the Lord forever.`,
    traditionalTime: "Anytime • In Times of Anxiety"
  },
  {
    id: "psalm-63",
    title: "Psalm 63: My Soul Thirsts for You",
    latinTitle: "Deus, Deus Meus",
    category: "psalms",
    shortDescription: "The morning psalm par excellence, expressing longing and communion with God.",
    textEnglish: `O God, you are my God; earnestly I seek you;
my soul thirsts for you;
my flesh faints for you,
as in a dry and weary land where there is no water.
So I have looked upon you in the sanctuary,
beholding your power and glory.

Because your steadfast love is better than life,
my lips will praise you.
So I will bless you as long as I live;
in your name I will lift up my hands.

My soul will be satisfied as with fat and rich food,
and my mouth will praise you with joyful lips,
when I remember you upon my bed,
and meditate on you in the watches of the night;
for you have been my help,
and in the shadow of your wings I will sing for joy.
My soul clings to you;
your right hand upholds me.`,
    traditionalTime: "Early Morning Prayer"
  },
  {
    id: "communion-prayers",
    title: "Prayers Before & After Holy Communion",
    latinTitle: "Preces ad Communionem",
    category: "communion",
    shortDescription: "Preparing the heart for the Eucharist and giving quiet thanksgiving afterwards.",
    textEnglish: `BEFORE COMMUNION:
Lord, I am not worthy that you should enter under my roof, but only say the word and my soul shall be healed.

Lord Jesus Christ, Son of the living God, who by the will of the Father and the work of the Holy Spirit, through your death brought life to the world: free me by this your most holy Body and Blood from all my sins and from every evil; keep me always faithful to your commandments, and never let me be parted from you. Amen.

AFTER COMMUNION (Anima Christi):
Soul of Christ, sanctify me.
Body of Christ, save me.
Blood of Christ, inebriate me.
Water from the side of Christ, wash me.
Passion of Christ, strengthen me.
O good Jesus, hear me.
Within Your wounds hide me.
Separated from You let me never be.
From the evil enemy defend me.
In the hour of my death call me,
and bid me come to You,
that with Your saints I may praise You
for ever and ever.
Amen.`,
    traditionalTime: "At Holy Mass"
  }
];
