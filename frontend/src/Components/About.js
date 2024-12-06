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
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '35px',
                marginTop: '45px',
                fontFamily: 'Poppins, sans-serif',
                backgroundColor: mode === 'light' ? '#ffffff' : '#1c1c2e',
                color: mode === 'light' ? '#2d2d2d' : '#e0e0e0',
                borderRadius: '15px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                animation: 'fadeIn 1s ease-in-out',
            },
            heading: {
                fontSize: '36px',
                fontWeight: '700',
                marginBottom: '20px',
                color: mode === 'light' ? '#2c3e50' : '#ffae42',
                textAlign: 'center',
                textTransform: 'capitalize',
                letterSpacing: '2px',
                borderBottom: `3px solid ${mode === 'light' ? 'orange' : '#ffae42'}`,
                paddingBottom: '12px',
            },
            subHeading: {
                fontSize: '24px',
                fontWeight: '600',
                marginTop: '25px',
                padding: "10px",
                marginBottom: '15px',
                color: mode === 'light' ? '#20887c' : '#ffcc66',
                backgroundColor: mode === 'light' ? '#eaf8f4' : '#2d2d3e',
                borderLeft: `5px solid ${mode === 'light' ? '#2a9d8f' : '#ffcc66'}`,
                paddingLeft: '12px',
            },
            paragraph: {
                fontSize: '18px',
                lineHeight: '1.7',
                color: mode === 'light' ? '#4d4d4d' : '#d6d6d6',
            },
            contentWrapper: {
                backgroundColor: mode === 'light' ? '#eaf8f4' : '#2d2d3e',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
            },
            list: {
                listStyleType: "circle",
                paddingLeft: '20px',
                fontSize: '18px',
                marginBottom: '20px',
                color: mode === 'light' ? '#333' : '#c5c5c5',
            },
            listItem: {
                marginBottom: '12px',
            },
            highlight: {
                backgroundColor: mode === 'light' ? '#fff8e4' : '#2b2b3d',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '20px',
                borderLeft: `5px solid ${mode === 'light' ? '#ffae42' : '#ffcc99'}`,
            },
            newsCard: {
                backgroundColor: mode === 'light' ? '#f9f9f9' : '#24243e',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                ':hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                },
                border: `1px solid ${mode === 'light' ? '#ddd' : '#444'}`,
            },
            badge: {
                display: 'inline-block',
                backgroundColor: mode === 'light' ? '#2a9d8f' : '#ffcc66',
                color: '#ffffff',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: '600',
                padding: '7px 20px',
                marginRight: '12px',
            },
            footer: {
                marginTop: '50px',
                textAlign: 'center',
                fontSize: '14px',
                color: mode === 'light' ? '#666' : '#bbbbbb',
                borderTop: `1px solid ${mode === 'light' ? '#e5e5e5' : '#444'}`,
                paddingTop: '20px',
            },
            thankYou: {
                marginTop: '40px',
                fontStyle: 'italic',
                color: mode === "light" ? '#777' : 'orange'
            },
            '@keyframes fadeIn': {
                from: { opacity: 0 },
                to: { opacity: 1 },
            },
            '@media (max-width: 768px)': {
                container: {
                    padding: '25px',
                    marginTop: '50px',
                },
                heading: {
                    fontSize: '30px',
                },
                subHeading: {
                    fontSize: '20px',
                },
                paragraph: {
                    fontSize: '16px',
                },
                list: {
                    fontSize: '16px',
                },
                newsCard: {
                    padding: '15px',
                },
            },
        };
    };


    render() {
        const styles = this.getStyles();

        document.title = "Homepage - MindSpace";
        return (
            <>
                <div style={styles.container}>
                    <h1 className="text-center" style={styles.heading}>MindSpace Odyssey : Explore Limitless Horizons</h1>
                    <h2 style={styles.subHeading}>Mission at a Glance</h2>
                    <div style={styles.contentWrapper}>
                        <p style={styles.paragraph}>
                            Embark on a voyage of discovery with Exploring Minds, your portal to profound insights and groundbreaking discoveries. We traverse the frontiers of knowledge, diving deep into neuroscience, psychology, and cognitive sciences to unlock the mysteries of the mind.
                        </p>
                    </div>

                    <h2 style={styles.subHeading}>Our Collective Quest</h2>
                    <div style={styles.contentWrapper}>
                        <p style={styles.paragraph}>At Exploring Minds, we are a vibrant collective of thinkers, researchers, and storytellers dedicated to unraveling the enigma of human cognition. Together, we curate engaging, enlightening content that fuels curiosity and sparks transformation.</p>
                    </div>

                    <h2 style={styles.subHeading}>The Journey Ahead</h2>
                    <div style={styles.contentWrapper}>
                        <p style={styles.paragraph}>Prepare for an odyssey of knowledge with Exploring Minds:</p>
                        <ul style={styles.list}>
                            <li style={styles.list}><strong>Innovative Insights:</strong> Delve into cutting-edge research shaping our understanding of the mind and its limitless potential.</li>
                            <li style={styles.list}><strong>Expert Perspectives:</strong> Gain wisdom from leading minds in neuroscience, psychology, and mental wellness, offering profound analyses and actionable advice.</li>
                            <li style={styles.list}><strong>Practical Wisdom:</strong> Unlock strategies for enhancing mental well-being, improving cognitive agility, and achieving personal growth.</li>
                            <li style={styles.list}><strong>Community Connection:</strong> Engage with a global community of inquisitive minds, exchange ideas, and ignite meaningful conversations.</li>
                        </ul>
                    </div>

                    <h2 style={styles.subHeading}>About MindSpace News App</h2>
                    <div style={styles.contentWrapper}>
                        <p style={styles.paragraph}>
                            MindSpace News is your go-to destination for the latest updates, insightful analyses, and thought-provoking articles on the intersection of science, technology, and human cognition. Here are some key features:
                        </p>
                        <ul style={styles.list}>
                            <li style={styles.list}><strong>Global News Coverage:</strong> Access news from various countries and regions, providing a comprehensive view of global events.</li>
                            <li style={styles.list}><strong>Search Functionality:</strong> Easily search for specific news topics or articles of interest using our powerful search feature.</li>
                            <li style={styles.list}><strong>News Categories:</strong> Explore a wide range of news categories including technology, science, health, business, entertainment, and more.</li>
                            <li style={styles.list}><strong>Personalized Experience:</strong> Customize your news feed based on your preferences and interests, ensuring you receive relevant content tailored to you.</li>
                            <li style={styles.list}><strong>User-Friendly Interface:</strong> Enjoy a seamless browsing experience with our intuitive and user-friendly interface, designed for ease of navigation.</li>
                        </ul>
                    </div>

                    <h2 style={styles.subHeading}>Explore Diverse News Categories</h2>
                    <div style={styles.contentWrapper}>
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
                    </div>

                    <p style={styles.thankYou}>Thank you for embarking on this intellectual odyssey with Exploring Minds and MindSpace News. Together, let&apos;s explore the boundless horizons of human cognition.</p>
                </div>
            </>
        );
    }
}
