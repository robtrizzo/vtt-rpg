import styles from '../../styles/Home.module.sass';
import Term from '../../components/Term';
import React from 'react';
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
          attacks: <Term>Armor</Term>, <Term>Block</Term>, <Term>Dodge</Term>,
          and <Term>Parry</Term>.
        </p>
        <h3>Armor</h3>
        <p>
          <Term>Armor</Term> is a character's last line of defense against an
          attack, when a character was unable to block or dodge an incoming
          attack. Armor protects a character in two ways: <Term>Coverage</Term>,
          and <Term>Reduction</Term>.
        </p>
        <p>
          <Term>Coverage</Term> represents how much of a character's body is
          protected by the armor. If an attacker wants to strike at a gap in the
          armor and bypass its <Term>Reduction</Term>, they must surpass the
          armor's <Term>Coverage</Term> threshold. For example, if a piece of
          armor has <Term>Coverage 5</Term> , the attacker's{' '}
          <Term>Precision</Term> must be 5 or higher to strike at a gap in the
          armor.
        </p>
        <p>
          <Term>Reduction</Term> represents how much damage an attack is reduced
          by when it hits the armor. <Term>Armor</Term> has three components to
          the <Term>Reduction</Term> stat: <Term>Bludgeoning</Term>,{' '}
          <Term>Piercing</Term>, and <Term>Slashing</Term>. Each of these
          components represents how much damage of that type is reduced by the
          armor. For example, if a piece of armor has{' '}
          <Term>Reduction 2/2/2</Term>, it will reduce
          <Term>Bludgeoning</Term> damage by 2, <Term>Piercing</Term> damage by
          2, and <Term>Slashing</Term> damage by 2.
        </p>
        <h3>Block</h3>
        <p>
          <Term>Block</Term> is a character's ability to forcibly stop an
          incoming attack. To do this, a defender makes a{' '}
          <Term>Block Check</Term>. <Term>Block Checks</Term> can be made with
          any handheld object or piece of armor which the character can easily
          move in the way (e.g. a gauntlet or vambrace).
        </p>
      </main>
    </div>
  );
}
