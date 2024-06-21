import React, { Component } from 'react';

export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.mode
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.mode !== this.props.mode) {
            this.setState({ mode: this.props.mode });
            document.body.style.backgroundColor = this.props.mode === "light" ? '#fff' : '#444';
        }
    }

    getStyles = () => {
        const { mode } = this.state;
        return {
            container: {
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '20px',
                marginTop: '70px',
                fontFamily: 'Arial, sans-serif',
            },
            heading: {
                fontSize: '30px',
                fontWeight: 'bold',
                marginBottom: '7px',
                marginTop: '7px',
                color: mode === "light" ? '#333' : '#fdf6e4',
                textAlign: 'center',
                textTransform: 'uppercase',
            },
            subHeading: {
                fontSize: '24px',
                fontWeight: 'bold',
                marginTop: '40px',
                marginBottom: '10px',
                color: mode === "light" ? '#333' : '#fdf6e4'
            },
            paragraph: {
                fontSize: '18px',
                marginBottom: '15px',
                lineHeight: '1.6',
                color: mode === "light" ? '#333' : '#fdf6e4'
            },
            list: {
                listStyleType: 'circle',
                paddingLeft: '20px',
                fontSize: '18px',
                marginBottom: '15px',
                color: mode === "light" ? '#333' : '#fdf6e4'
            },
            thankYou: {
                marginTop: '40px',
                fontStyle: 'italic',
                color: mode === "light" ? '#777' : 'orange'
            }
        };
    }

    render() {
        const styles = this.getStyles();

        document.title = "Homepage - MindSpace";
        return (
            <>
                <div style={styles.container}>
                    <h1 className="text-center" style={styles.heading}>MindSpace Odyssey : Explore Limitless Horizons</h1>
                    <h2 style={styles.subHeading}>Mission at a Glance</h2>
                    <p style={styles.paragraph}>Embark on a voyage of discovery with Exploring Minds, your portal to profound insights and groundbreaking discoveries. We traverse the frontiers of knowledge, diving deep into neuroscience, psychology, and cognitive sciences to unlock the mysteries of the mind.</p>

                    <h2 style={styles.subHeading}>Our Collective Quest</h2>
                    <p style={styles.paragraph}>At Exploring Minds, we are a vibrant collective of thinkers, researchers, and storytellers dedicated to unraveling the enigma of human cognition. Together, we curate engaging, enlightening content that fuels curiosity and sparks transformation.</p>

                    <h2 style={styles.subHeading}>The Journey Ahead</h2>
                    <p style={styles.paragraph}>Prepare for an odyssey of knowledge with Exploring Minds:</p>
                    <ul style={styles.list}>
                        <li style={styles.list}>Innovative Insights: Delve into cutting-edge research shaping our understanding of the mind and its limitless potential.</li>
                        <li style={styles.list}>Expert Perspectives: Gain wisdom from leading minds in neuroscience, psychology, and mental wellness, offering profound analyses and actionable advice.</li>
                        <li style={styles.list}>Practical Wisdom: Unlock strategies for enhancing mental well-being, improving cognitive agility, and achieving personal growth.</li>
                        <li style={styles.list}>Community Connection: Engage with a global community of inquisitive minds, exchange ideas, and ignite meaningful conversations.</li>
                    </ul>

                    <h2 style={styles.subHeading}>About MindSpace News App</h2>
                    <p style={styles.paragraph}>MindSpace News is your go-to destination for the latest updates, insightful analyses, and thought-provoking articles on the intersection of science, technology, and human cognition. Here are some key features:</p>
                    <ul style={styles.list}>
                        <li style={styles.list}>Global News Coverage: Access news from various countries and regions, providing a comprehensive view of global events.</li>
                        <li style={styles.list}>Search Functionality: Easily search for specific news topics or articles of interest using our powerful search feature.</li>
                        <li style={styles.list}>News Categories: Explore a wide range of news categories including technology, science, health, business, entertainment, and more.</li>
                        <li style={styles.list}>Personalized Experience: Customize your news feed based on your preferences and interests, ensuring you receive relevant content tailored to you.</li>
                        <li style={styles.list}>User-Friendly Interface: Enjoy a seamless browsing experience with our intuitive and user-friendly interface, designed for ease of navigation.</li>
                        <li style={styles.list}>Share Your Experience:  We encourage you to share your experiences and insights related to the news articles. Your feedback is valuable and helps us curate even better content for our community.</li>
                    </ul>

                    <h2 style={styles.subHeading}>Explore Diverse News Categories</h2>
                    <p style={styles.paragraph}>MindSpace News offers a diverse range of news categories to cater to your interests:</p>
                    <ul style={styles.list}>
                        <li style={styles.list}><strong>General:</strong> Stay updated with general news covering a wide range of topics.</li>
                        <li style={styles.list}><strong>Business:</strong> Get insights into the latest business trends, market updates, and economic developments.</li>
                        <li style={styles.list}><strong>Entertainment:</strong> Discover the latest in entertainment, including movies, music, celebrities, and more.</li>
                        <li style={styles.list}><strong>Health:</strong> Stay informed about health news, wellness tips, medical breakthroughs, and lifestyle updates.</li>
                        <li style={styles.list}><strong>Science:</strong> Dive deep into scientific discoveries, technological advancements, and innovations shaping the future.</li>
                        <li style={styles.list}><strong>Sports:</strong> Follow your favorite sports teams, athletes, and sporting events with comprehensive coverage.</li>
                        <li style={styles.list}><strong>Technology:</strong> Explore the world of technology with news on gadgets, software, AI, and digital trends.</li>
                    </ul>

                    <p style={styles.thankYou}>Thank you for embarking on this intellectual odyssey with Exploring Minds and MindSpace News. Together, let&apos;s explore the boundless horizons of human cognition.</p>
                </div>
            </>
        );
    }
}
