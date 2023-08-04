import { Link } from 'react-router-dom';
import './About.css';

function Info() {
  return (
    <div className="background-img">
      <div className="body-info">
        <h1 className="h1-title">
          {' '}
          ברוכים הבאים להזמנת אתרי קמפינג של רשות הטבע והגנים!
        </h1>
        <div className="flex-container-info">
          <br />
          <section className="section-info">
            <p>
              אנו ברשות הטבע והגנים מאמינים בכוחו של הטבע לחדש ולעורר השראה.
              המשימה שלנו היא לשמר ולהגן על אוצרות הטבע של ארצנו היפה, לאפשר
              למבקרים לטבול את עצמם בנופים מעוררי כבוד וליצור זיכרונות לכל
              החיים. בין אם אתה חובב טבע, מחפש הרפתקאות או משפחה המחפשת חופשה
              שלווה, אתרי הקמפינג שלנו מציעים את המפלט המושלם.
            </p>
            <p>
              עם מורשת המתפרשת על פני עשרות שנים, רשות הטבע והגנים מופקדת על
              השמירה על המערכות האקולוגיות ובתי הגידול המגוונים שהופכים את ארצנו
              למיוחדת כל כך. אתרי הקמפינג שלנו נבחרו בקפידה כדי להציג את היופי
              המדהים ואת המגוון הביולוגי העשיר שנמצא בפארקים הלאומיים, בשמורות
              הטבע ובאזורים המוגנים שלנו. אנו שואפים ליצור איזון הרמוני בין
              שמירה על הטבע לבין מתן חווית קמפינג נוחה לאורחים שלנו.
            </p>
            <p>
              הזמנת מקום באתרי הקמפינג שלנו קלה ונוחה. מערכת ההזמנות המקוונת
              הידידותית למשתמש מאפשרת לך לדפדף בין תאריכים זמינים, לבחור את
              המיקום המועדף עליך ולהבטיח את מקומך בכמה קליקים בלבד. הצוות המסור
              שלנו תמיד מוכן לסייע לך ולספק כל מידע הכרחי כדי להבטיח שחווית
              הקמפינג שלך תהיה חלקה ובלתי נשכחת.
            </p>
            <p>
              על ידי בחירת לינה באתרי הקמפינג שלנו, אתה הופך לחלק מהמחויבות שלנו
              לשמר את פלאי הטבע לדורות הבאים. אנו מעודדים שיטות קמפינג אחראיות,
              כגון לא להשאיר עקבות, כיבוד חיות בר ושמירה על חוקי הפארק והתקנות.
              יחד, נוכל לטפח עתיד בר קיימא ולהגן על המורשת הטבעית שהופכת את
              המדינה שלנו לכל כך יוצאת דופן.
            </p>
            <p>
              תודה שבחרתם ברשות הטבע והגנים הזמנת אתרי קמפינג. אנו מצפים לקבל את
              פניכם לחוויית קמפינג בלתי נשכחת, בה מחכה חיבוקו של הטבע. תן
              להרפתקה שלך להתחיל!
            </p>
          </section>

          <Link to="/" className="primary-button button-hover-white">
            <b> חזרה לדף הראשי</b>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Info;