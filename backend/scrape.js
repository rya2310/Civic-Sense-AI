import axios from 'axios';
import cheerio from 'cheerio';
import dotenv from 'dotenv';

dotenv.config();

const categories = ["road issues", "electricity complaints", "water supply"];  // Add more

async function scrapeComplaints(category) {
    try {
        const url = `https://example.com/complaints?category=${encodeURIComponent(category)}`;  // Replace with actual site
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let complaints = [];
        $(".complaint-item").each((index, element) => {
            let title = $(element).find(".title").text().trim();
            let location = $(element).find(".location").text().trim();
            let description = $(element).find(".description").text().trim();        
            let timeCreated = $(element).find(".time").text().trim();

            complaints.push({ category, title, location, description, timeCreated });
        });

        console.log(`Complaints for ${category}:`, complaints);
        return complaints;
    } catch (error) {
        console.error(`Error scraping ${category}:`, error.message);
    }
}

// Loop through categories
(async () => {
    for (let category of categories) {
        await scrapeComplaints(category);
    }
})();
