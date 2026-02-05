"use client";

import "./home.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const sports = [
    { name: "CRICKET", slug: "cricketmatches", image: "/images/Cricket.webp" },
    { name: "BASKETBALL", slug: "basketballinfo", image: "/images/Basketball.webp" },
    { name: "FOOTBALL", slug: "footballmatches", image: "/images/Football.webp" },
    { name: "AMERICAN FOOTBALL", slug: "americanfootballmatches", image: "/images/AmericanFootball.webp" },
    { name: "HOCKEY", slug: "hockeymatches", image: "/images/Hockey.webp" },
    { name: "BASEBALL", slug: "baseballmatches", image: "/images/Baseball.webp" },
    { name: "MOTOR-SPORTS", slug: "motorsportmatches", image: "/images/Motorsports.webp" },
    { name: "FIGHT", slug: "fightmatches", image: "/images/Fight.webp" },
    { name: "TENNIS", slug: "tennismatches", image: "/images/Tennis.webp" },
    { name: "RUGBY", slug: "rugbymatches", image: "/images/Rugby.webp" },
    { name: "GOLF", slug: "golfmatches", image: "/images/Golf.webp" },
    { name: "BILLIARDS", slug: "billiardmatches", image: "/images/Billiards.webp" },
    { name: "AFL", slug: "aflmatches", image: "/images/AFL.webp" },
    { name: "DARTS", slug: "dartmatches", image: "/images/Darts.webp" },
    { name: "OTHERS", slug: "othermatches", image: "/images/Others.webp" },
  ];


  const [viewCounts, setViewCounts] = useState({});

  useEffect(() => {
    const stored = sessionStorage.getItem("live_view_counts");
    if (stored) {
      setViewCounts(JSON.parse(stored));
    } else {
      const init = {};
      sports.forEach(s => (init[s.slug] = 0));
      setViewCounts(init);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(viewCounts).length > 0) {
      sessionStorage.setItem("live_view_counts", JSON.stringify(viewCounts));
    }
  }, [viewCounts]);

  const handleCardClick = (slug) => {
    const key = `watching_${slug}`;

    if (!sessionStorage.getItem(key)) {
      setViewCounts(prev => ({
        ...prev,
        [slug]: prev[slug] + 1,
      }));

      sessionStorage.setItem(key, "true");
    }

    router.push("/" + slug);
  };

  useEffect(() => {
    const handleUnload = () => {
      const stored = sessionStorage.getItem("live_view_counts");
      if (!stored) return;

      let counts = JSON.parse(stored);

      sports.forEach(sport => {
        const key = `watching_${sport.slug}`;
        if (sessionStorage.getItem(key)) {
          counts[sport.slug] = Math.max(counts[sport.slug] - 1, 0);
          sessionStorage.removeItem(key);
        }
      });

      sessionStorage.setItem("live_view_counts", JSON.stringify(counts));
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  return (
    <div className="home">
      <section className="categories">
        <div className="category-grid">

          {sports.map(sport => (
            <Link
              key={sport.slug}
              href={`/${sport.slug}`}
              className="category-card"
              onClick={() => handleCardClick(sport.slug)}
            >
              <span className="badge hover-badge">
                {viewCounts[sport.slug] ?? 0} 👁️
              </span>

              <img src={sport.image} alt={sport.name} />
              <p>{sport.name}</p>
            </Link>
          ))}


        </div>
      </section>

      <section className="passionate">
        <p>
          Are you a true sports lover searching for a reliable place to watch live games online? Welcome to Buffstreams.us — your go-to destination for live sports streaming. With our clean, easy-to-use interface and wide sports coverage, you can enjoy every thrilling moment without missing a beat.

          From cricket and soccer to NFL, NBA, MMA, and more — Buffstreams brings you all your favorite sports in one place. Experience smooth, high-quality streams and stay connected to the action anytime, anywhere.

          Join Buffstreams today and discover why sports fans around the world trust us for the best free live sports streaming experience!
        </p>
      </section>
      <section className="why-section">

        <h2 className="why-title">
          <span></span>
          WHY CHOOSE BUFFSTREAMS?
          <span></span>
        </h2>

        <div className="why-wrapper">

          <div className="why-item">
            <div className="why-number">1</div>
            <div className="why-box">
              <h3>Wide Range of Sports Coverage</h3>
              <p>
                Whether you love <strong>cricket</strong>, <strong>soccer</strong>, <strong>basketball</strong>, or <strong>MMA</strong>,
                Buffstreams brings you all the action live. From the <em>Super Bowl</em> to the
                <em>Premier League</em> and <em>NBA</em> — we make sure you never miss a moment.
              </p>
            </div>
          </div>

          <div className="why-item">
            <div className="why-number">2</div>
            <div className="why-box">
              <h3>HD-Quality Streams</h3>
              <p>
                Enjoy smooth, <strong>HD-quality live streaming</strong> with minimal buffering.
                Our technology adjusts to your internet speed for the best possible viewing
                experience — so you can focus on the excitement of the game.
              </p>
            </div>
          </div>

          <div className="why-item">
            <div className="why-number">3</div>
            <div className="why-box">
              <h3>Fast & Reliable Updates</h3>
              <p>
                Get real-time match updates, highlights, and schedules — all in one place.
                With Buffstreams, you’ll always stay connected to what’s happening in sports.
              </p>
            </div>
          </div>

        </div>

      </section>
      <section className="offer-section">

        <h2 className="offer-title">
          <span></span>
          WHAT WE OFFER
          <span></span>
        </h2>

        <div className="offer-grid">

          <div className="offer-card">
            <strong>Cricket:</strong> Stream top cricket leagues like the <em>IPL</em>, <em>PSL</em>, <em>BPL</em>, and <em>Big Bash League</em> live on Buffstreams.
          </div>

          <div className="offer-card">
            <strong>Soccer:</strong> Watch matches from the <em>Premier League</em>, <em>La Liga</em>, and other top international football leagues.
          </div>

          <div className="offer-card">
            <strong>NFL & NBA:</strong> Enjoy HD live streams of <em>NFL</em> games and thrilling <em>NBA</em> matchups, all in one place.
          </div>

          <div className="offer-card">
            <strong>MMA & Boxing:</strong> Catch every punch and knockout from <em>UFC</em> and major boxing events in real time.
          </div>

          <div className="offer-card">
            <strong>Tennis & Hockey:</strong> Follow every serve, goal, and highlight from <em>Grand Slam</em> tournaments and <em>NHL</em> games.
          </div>

          <div className="offer-card">
            <strong>Motorsports:</strong> Stream exciting <em>F1</em>, <em>Nascar</em>, and <em>Motogp</em> races live and feel the rush of high-speed action.
          </div>

          <div className="offer-card">
            <strong>eSports:</strong> Watch live tournaments for top games like <em>CS:GO</em>, <em>Valorant</em>, and <em>League of Legends</em> — all in real time.
          </div>

          <div className="offer-card">
            <strong>Golf:</strong> Stay updated with live coverage from <em>PGA Tour</em> and other major golf championships worldwide.
          </div>

        </div>


      </section>
      <section class="commit-section">
        <div class="commit-box">
          <h2>Buffstreams’ Commitment to True Sports Fans</h2>
          <p>
            At <strong>Buffstreams</strong>, we’re not just another streaming website — we’re your
            dedicated companion for every thrilling sports moment. Whether it’s a nail-biting
            <em>Premier League</em> match, a fierce <em>UFC</em> fight, or an intense <em>NBA</em> showdown,
            our mission is to bring the stadium experience right to your screen.
          </p>
          <p>
            With reliable, high-quality streams and instant access to live games, we make sure
            you never miss a single play. Our team constantly works behind the scenes to enhance
            your experience — so you can watch, cheer, and celebrate your favorite teams
            without interruptions.
          </p>
          <p class="commit-highlight">
            🎯 Your passion is our priority — stay with Buffstreams and enjoy sports the way they’re meant to be watched!
          </p>
          <Link href="footballmatches" class="commit-btn">Start Watching Live Now</Link>
        </div>
      </section>

      <section class="experience-section">
        <div class="experience-box">
          <h2>Experience Buffstreams Today</h2>
          <p>
            Join the thousands of sports fans who trust Buffstreams for their live
            sports streaming needs. Whether you're a die-hard NFL fan, a cricket
            enthusiast, or a casual viewer, Buffstreams is your ultimate destination
            for live sports coverage.
          </p>
        </div>
      </section>
    </div>
  );
}


