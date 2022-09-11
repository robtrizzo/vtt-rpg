import styles from '../../styles/Home.module.sass';
export default function CombatForNerds() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Combat for Nerds</h1>
        <a href="/guides/combat">
          {' '}
          <h2>&larr; Combat</h2>{' '}
        </a>
        {/* <h2>Weapon Properties</h2>
        <ul>
          <li>Reach</li>
          <li>Piercing</li>
          <li>Slashing</li>
          <li>Bludgeoning</li>
        </ul> */}
        <h2>Defenses Against Weapon Attacks</h2>
        <p>
          A character has four stats affecting their defense against weapon
          attacks: <span className={styles.code}>Armor</span>,{' '}
          <span className={styles.code}>Block</span>,{' '}
          <span className={styles.code}>Dodge</span>, and{' '}
          <span className={styles.code}>Parry</span>.
        </p>
        <h3>Armor</h3>
        <p>
          <span className={styles.code}>Armor</span> is a character's last line
          of defense against an attack, when a character was unable to block or
          dodge an incoming attack. Armor protects a character in two ways:{' '}
          <span className={styles.code}>Coverage</span>, and{' '}
          <span className={styles.code}>Reduction</span>.
        </p>
        <p>
          <span className={styles.code}>Coverage</span> represents how much of a
          character's body is protected by the armor. If an attacker wants to
          strike at a gap in the armor and bypass its{' '}
          <span className={styles.code}>Reduction</span>, they must surpass the
          armor's <span className={styles.code}>Coverage</span> threshold. For
          example, if a piece of armor has{' '}
          <span className={styles.code}>Coverage 5</span> , the attacker's{' '}
          <span className={styles.code}>Precision</span> must be 5 or higher to
          strike at a gap in the armor.
        </p>
        <p>
          <span className={styles.code}>Reduction</span> represents how much
          damage an attack is reduced by when it hits the armor.{' '}
          <span className={styles.code}>Armor</span> has three components to the{' '}
          <span className={styles.code}>Reduction</span> stat:{' '}
          <span className={styles.code}>Bludgeoning</span>,{' '}
          <span className={styles.code}>Piercing</span>, and{' '}
          <span className={styles.code}>Slashing</span>. Each of these
          components represents how much damage of that type is reduced by the
          armor. For example, if a piece of armor has{' '}
          <span className={styles.code}>Reduction 2/2/2</span>, it will reduce
          <span className={styles.code}>Bludgeoning</span> damage by 2,{' '}
          <span className={styles.code}>Piercing</span> damage by 2, and{' '}
          <span className={styles.code}>Slashing</span> damage by 2.
        </p>
        <h3>Block</h3>
        <p>
          <span className={styles.code}>Block</span> is a character's ability to
          forcibly stop an incoming attack. To do this, a defender makes a{' '}
          <span className={styles.code}>Block Check</span>.{' '}
          <span className={styles.code}>Block Checks</span> can be made with any
          handheld object or piece of armor which the character can easily move
          in the way (e.g. a gauntlet or vambrace).
        </p>
      </main>
    </div>
  );
}
