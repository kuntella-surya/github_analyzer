import { getUserData, getUserRepos } from "../services/githubService.js";
import { db } from "../config/db.js";

export const analyzeProfile = async (req, res) => {
  const { username } = req.params;

  try {
    
    const checkSql = "SELECT * FROM github_profiles WHERE username = ?";

    db.query(checkSql, [username], async (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // CACHE HIT
      if (results.length > 0) {
        return res.json({
          message: "From Cache (DB)",
          data: results[0],
        });
      }


      const user = await getUserData(username);
      const repos = await getUserRepos(username);

      
      let totalStars = 0;
      let languageMap = {};

      repos.forEach(repo => {
        totalStars += repo.stargazers_count;

        if (repo.language) {
          languageMap[repo.language] =
            (languageMap[repo.language] || 0) + 1;
        }
      });

      let topLanguage = null;
      let maxCount = 0;

      for (let lang in languageMap) {
        if (languageMap[lang] > maxCount) {
          maxCount = languageMap[lang];
          topLanguage = lang;
        }
      }


      let totalLangCount = Object.values(languageMap).reduce((a, b) => a + b, 0);

      let languageStats = {};

      for (let lang in languageMap) {
        languageStats[lang] = totalLangCount
          ? parseFloat(((languageMap[lang] / totalLangCount) * 100).toFixed(2))
          : 0;
      }

   
      let activityScore =
        user.followers +
        user.public_repos * 2 +
        totalStars / 5;

      let activityLevel = "";

      if (activityScore > 5000) {
        activityLevel = "🔥 High Activity";
      } else if (activityScore > 1000) {
        activityLevel = "⚡ Medium Activity";
      } else {
        activityLevel = "💤 Low Activity";
      }

    
      const profileData = {
        username: user.login,
        followers: user.followers,
        following: user.following,
        public_repos: user.public_repos,
        total_stars: totalStars,
        top_language: topLanguage,
        language_stats: languageStats,
        activity_score: activityScore,
        activity_level: activityLevel,
        avatar_url: user.avatar_url,
        created_at: user.created_at,
      };

   
      const sql = `
        INSERT INTO github_profiles 
        (username, followers, following, public_repos, total_stars, avatar_url, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          followers = VALUES(followers),
          following = VALUES(following),
          public_repos = VALUES(public_repos),
          total_stars = VALUES(total_stars),
          avatar_url = VALUES(avatar_url),
          created_at = VALUES(created_at)
      `;

      const values = [
        profileData.username,
        profileData.followers,
        profileData.following,
        profileData.public_repos,
        profileData.total_stars,
        profileData.avatar_url,
        profileData.created_at,
      ];

      db.query(sql, values, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        return res.json({
          message: "Profile analyzed successfully",
          data: profileData,
        });
      });
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};