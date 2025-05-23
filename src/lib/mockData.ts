/**
 * Mock data for the application
 * Used as fallback when API requests fail
 */

/**
 * Mock categories
 */
export const mockCategories = [
  {
    id: 1,
    name: 'Small Animals',
    slug: 'small-animals',
    description: 'Information about small animals like sheep, goats, etc.',
    image_url: '/images/categories/small-animals.jpg',
    parent_id: null,
    created_at: '2024-06-01T12:00:00',
    updated_at: '2024-06-01T12:00:00',
    children: [
      {
        id: 4,
        name: 'Sheep',
        slug: 'sheep',
        description: 'Information about sheep health and care',
        image_url: '/images/categories/sheep.jpg',
        parent_id: 1,
        created_at: '2024-06-01T12:00:00',
        updated_at: '2024-06-01T12:00:00'
      },
      {
        id: 5,
        name: 'Goats',
        slug: 'goats',
        description: 'Information about goat health and care',
        image_url: '/images/categories/goats.jpg',
        parent_id: 1,
        created_at: '2024-06-01T12:00:00',
        updated_at: '2024-06-01T12:00:00'
      }
    ]
  },
  {
    id: 2,
    name: 'Large Animals',
    slug: 'large-animals',
    description: 'Information about large animals like cattle, horses, etc.',
    image_url: '/images/categories/large-animals.jpg',
    parent_id: null,
    created_at: '2024-06-01T12:00:00',
    updated_at: '2024-06-01T12:00:00',
    children: [
      {
        id: 6,
        name: 'Cattle',
        slug: 'cattle',
        description: 'Information about cattle health and care',
        image_url: '/images/categories/cattle.jpg',
        parent_id: 2,
        created_at: '2024-06-01T12:00:00',
        updated_at: '2024-06-01T12:00:00'
      },
      {
        id: 7,
        name: 'Horses',
        slug: 'horses',
        description: 'Information about horse health and care',
        image_url: '/images/categories/horses.jpg',
        parent_id: 2,
        created_at: '2024-06-01T12:00:00',
        updated_at: '2024-06-01T12:00:00'
      }
    ]
  },
  {
    id: 3,
    name: 'Pets',
    slug: 'pets',
    description: 'Information about pets like dogs, cats, etc.',
    image_url: '/images/categories/pets.jpg',
    parent_id: null,
    created_at: '2024-06-01T12:00:00',
    updated_at: '2024-06-01T12:00:00',
    children: [
      {
        id: 8,
        name: 'Dogs',
        slug: 'dogs',
        description: 'Information about dog health and care',
        image_url: '/images/categories/dogs.jpg',
        parent_id: 3,
        created_at: '2024-06-01T12:00:00',
        updated_at: '2024-06-01T12:00:00'
      },
      {
        id: 9,
        name: 'Cats',
        slug: 'cats',
        description: 'Information about cat health and care',
        image_url: '/images/categories/cats.jpg',
        parent_id: 3,
        created_at: '2024-06-01T12:00:00',
        updated_at: '2024-06-01T12:00:00'
      }
    ]
  }
];

/**
 * Mock articles
 */
export const mockArticles = [
  {
    id: 1,
    title: 'Understanding Small Animals Health and Wellness',
    slug: 'understanding-small-animals-health',
    excerpt: 'A comprehensive guide to maintaining optimal health for small animals.',
    content: `
      <h2>Introduction to Small Animal Health</h2>
      <p>Small animals like sheep and goats require specific care to maintain their health and productivity. This article covers the essential aspects of small animal health management.</p>
      
      <h2>Nutrition Requirements</h2>
      <p>Proper nutrition is the foundation of good health for small animals. They require a balanced diet that includes:</p>
      <ul>
        <li>High-quality forage</li>
        <li>Appropriate protein levels</li>
        <li>Essential minerals and vitamins</li>
        <li>Clean, fresh water</li>
      </ul>
      
      <h2>Common Health Issues</h2>
      <p>Small animals are susceptible to various health problems that farmers and pet owners should be aware of:</p>
      <ul>
        <li>Parasitic infections (internal and external)</li>
        <li>Respiratory diseases</li>
        <li>Digestive disorders</li>
        <li>Reproductive problems</li>
      </ul>
      
      <h2>Preventive Care</h2>
      <p>Regular preventive care can help avoid many common health issues:</p>
      <ul>
        <li>Vaccination schedules</li>
        <li>Parasite control programs</li>
        <li>Regular health check-ups</li>
        <li>Proper housing and sanitation</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>By understanding the basic health needs of small animals, owners can ensure their animals lead healthy, productive lives. Regular monitoring and prompt attention to any health issues are key to successful small animal management.</p>
    `,
    featured_image: '/images/articles/small-animals-health.jpg',
    category_id: 1,
    author_id: 1,
    is_featured: true,
    published_at: '2024-06-10T12:00:00',
    created_at: '2024-06-09T10:00:00',
    updated_at: '2024-06-09T10:00:00',
    category: {
      id: 1,
      name: 'Small Animals',
      slug: 'small-animals'
    },
    author: {
      id: 1,
      full_name: 'Dr. Veterinary Expert',
      avatar: '/images/users/vet-expert.jpg'
    }
  },
  {
    id: 2,
    title: 'Cattle Vaccination Schedule: A Complete Guide',
    slug: 'cattle-vaccination-schedule',
    excerpt: 'Learn about essential vaccinations for cattle and when to administer them.',
    content: `
      <h2>Introduction to Cattle Vaccination</h2>
      <p>Vaccinations are a critical component of preventive healthcare for cattle. This guide provides a comprehensive overview of essential vaccines and when to administer them.</p>
      
      <h2>Core Vaccines for Cattle</h2>
      <p>All cattle should receive these core vaccines:</p>
      <ul>
        <li>Blackleg (Clostridial diseases)</li>
        <li>Bovine Respiratory Disease complex</li>
        <li>Infectious Bovine Rhinotracheitis (IBR)</li>
        <li>Bovine Viral Diarrhea (BVD)</li>
      </ul>
      
      <h2>Vaccination Schedule</h2>
      <p>The following schedule is recommended for most cattle operations:</p>
      
      <h3>Calves (2-4 months)</h3>
      <ul>
        <li>First round of core vaccines</li>
        <li>Blackleg 7-way vaccine</li>
      </ul>
      
      <h3>Calves (Pre-weaning)</h3>
      <ul>
        <li>Booster for core vaccines</li>
        <li>Additional respiratory vaccines</li>
      </ul>
      
      <h3>Heifers (Pre-breeding)</h3>
      <ul>
        <li>Reproductive vaccines</li>
        <li>Booster for core vaccines</li>
      </ul>
      
      <h3>Adult Cows (Annual)</h3>
      <ul>
        <li>Booster for all core vaccines</li>
        <li>Reproductive vaccines before breeding</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>A well-planned vaccination program is essential for maintaining herd health and productivity. Consult with your veterinarian to develop a vaccination schedule tailored to your specific operation and regional disease risks.</p>
    `,
    featured_image: '/images/articles/cattle-vaccination.jpg',
    category_id: 6,
    author_id: 2,
    is_featured: true,
    published_at: '2024-06-12T14:30:00',
    created_at: '2024-06-11T09:15:00',
    updated_at: '2024-06-11T09:15:00',
    category: {
      id: 6,
      name: 'Cattle',
      slug: 'cattle'
    },
    author: {
      id: 2,
      full_name: 'Dr. Livestock Specialist',
      avatar: '/images/users/livestock-specialist.jpg'
    }
  },
  {
    id: 3,
    title: 'Common Diseases in Dogs and Their Symptoms',
    slug: 'common-diseases-in-dogs',
    excerpt: 'Recognize the signs of common canine diseases to ensure early treatment.',
    content: `
      <h2>Introduction</h2>
      <p>Dogs are susceptible to various diseases that can affect their health and quality of life. Early recognition of symptoms can lead to prompt treatment and better outcomes.</p>
      
      <h2>Canine Parvovirus</h2>
      <p>Parvovirus is a highly contagious viral disease that affects dogs, particularly puppies.</p>
      <h3>Symptoms:</h3>
      <ul>
        <li>Severe, bloody diarrhea</li>
        <li>Vomiting</li>
        <li>Loss of appetite</li>
        <li>Lethargy</li>
        <li>Fever</li>
      </ul>
      
      <h2>Canine Distemper</h2>
      <p>Distemper is a serious viral illness with no cure, but it can be prevented through vaccination.</p>
      <h3>Symptoms:</h3>
      <ul>
        <li>Fever</li>
        <li>Nasal discharge</li>
        <li>Coughing</li>
        <li>Lethargy</li>
        <li>Reduced appetite</li>
        <li>Neurological symptoms in advanced stages</li>
      </ul>
      
      <h2>Kennel Cough</h2>
      <p>Kennel cough is a highly contagious respiratory disease.</p>
      <h3>Symptoms:</h3>
      <ul>
        <li>Persistent, forceful cough</li>
        <li>Retching</li>
        <li>Watery nasal discharge</li>
        <li>In severe cases, fever and lethargy</li>
      </ul>
      
      <h2>Lyme Disease</h2>
      <p>Lyme disease is transmitted through tick bites and can cause serious health problems.</p>
      <h3>Symptoms:</h3>
      <ul>
        <li>Lameness that shifts from leg to leg</li>
        <li>Swollen joints</li>
        <li>Fever</li>
        <li>Reduced appetite</li>
        <li>Lethargy</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Regular veterinary check-ups and vaccinations are essential for preventing many common canine diseases. If you notice any unusual symptoms in your dog, consult your veterinarian promptly for proper diagnosis and treatment.</p>
    `,
    featured_image: '/images/articles/dog-diseases.jpg',
    category_id: 8,
    author_id: 3,
    is_featured: false,
    published_at: '2024-06-15T10:45:00',
    created_at: '2024-06-14T16:30:00',
    updated_at: '2024-06-14T16:30:00',
    category: {
      id: 8,
      name: 'Dogs',
      slug: 'dogs'
    },
    author: {
      id: 3,
      full_name: 'Dr. Pet Care Expert',
      avatar: '/images/users/pet-expert.jpg'
    }
  },
  {
    id: 4,
    title: 'Sheep Breeding: Best Practices for Successful Lambing',
    slug: 'sheep-breeding-best-practices',
    excerpt: 'Learn the essential practices for a successful sheep breeding program.',
    content: `
      <h2>Introduction to Sheep Breeding</h2>
      <p>Successful sheep breeding requires careful planning, proper nutrition, and good management practices. This article outlines the key considerations for a productive breeding program.</p>
      
      <h2>Breeding Season Preparation</h2>
      <p>Proper preparation before the breeding season is crucial:</p>
      <ul>
        <li>Evaluate ewe body condition (aim for score 3-3.5)</li>
        <li>Implement flushing (increased nutrition) 2-3 weeks before breeding</li>
        <li>Conduct breeding soundness examinations for rams</li>
        <li>Plan breeding groups based on genetics and goals</li>
      </ul>
      
      <h2>Breeding Management</h2>
      <p>During the breeding season, consider these management practices:</p>
      <ul>
        <li>Use proper ram-to-ewe ratios (1:25-50 depending on conditions)</li>
        <li>Consider synchronized breeding for uniform lamb crops</li>
        <li>Use marking harnesses to monitor breeding activity</li>
        <li>Rotate rams if using multiple sires</li>
      </ul>
      
      <h2>Pregnancy Management</h2>
      <p>Once ewes are bred, proper management is essential:</p>
      <ul>
        <li>Confirm pregnancy through ultrasound at 45-90 days</li>
        <li>Adjust nutrition based on pregnancy status and stage</li>
        <li>Administer pre-lambing vaccinations</li>
        <li>Prepare lambing facilities</li>
      </ul>
      
      <h2>Lambing Management</h2>
      <p>During lambing, close attention is required:</p>
      <ul>
        <li>Monitor ewes for signs of lambing</li>
        <li>Be prepared to assist difficult births</li>
        <li>Ensure lambs receive colostrum within first 6 hours</li>
        <li>Check for maternal bonding</li>
        <li>Process lambs (navel dip, ear tags, etc.)</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>A successful sheep breeding program requires attention to detail at every stage. By implementing these best practices, producers can improve lambing rates, lamb survival, and overall flock productivity.</p>
    `,
    featured_image: '/images/articles/sheep-breeding.jpg',
    category_id: 4,
    author_id: 1,
    is_featured: false,
    published_at: '2024-06-08T09:30:00',
    created_at: '2024-06-07T14:20:00',
    updated_at: '2024-06-07T14:20:00',
    category: {
      id: 4,
      name: 'Sheep',
      slug: 'sheep'
    },
    author: {
      id: 1,
      full_name: 'Dr. Veterinary Expert',
      avatar: '/images/users/vet-expert.jpg'
    }
  },
  {
    id: 5,
    title: 'Feline Nutrition: Essential Diet Guidelines for Cats',
    slug: 'feline-nutrition-guidelines',
    excerpt: 'Understand the nutritional needs of cats for optimal health and longevity.',
    content: `
      <h2>Introduction to Feline Nutrition</h2>
      <p>Cats have unique nutritional requirements that differ significantly from other pets. As obligate carnivores, their diet must be carefully managed to ensure optimal health.</p>
      
      <h2>Protein Requirements</h2>
      <p>Protein is the cornerstone of feline nutrition:</p>
      <ul>
        <li>Cats require high-quality animal protein</li>
        <li>Adult cats need a minimum of 26% protein in their diet</li>
        <li>Essential amino acids like taurine must be provided</li>
        <li>Plant proteins alone are insufficient for cats</li>
      </ul>
      
      <h2>Fat Requirements</h2>
      <p>Fats provide essential energy and nutrients:</p>
      <ul>
        <li>Cats need certain fatty acids that they cannot produce</li>
        <li>Arachidonic acid is essential for cats</li>
        <li>Omega-3 and Omega-6 fatty acids support skin, coat, and overall health</li>
        <li>Adult cats need approximately 9% fat in their diet</li>
      </ul>
      
      <h2>Carbohydrates in Feline Diets</h2>
      <p>While not strictly required, carbohydrates play a role in commercial cat foods:</p>
      <ul>
        <li>Cats have limited ability to digest carbohydrates</li>
        <li>High-carbohydrate diets may contribute to obesity and diabetes</li>
        <li>Some fiber is beneficial for digestive health</li>
        <li>Grain-free doesn't necessarily mean low-carbohydrate</li>
      </ul>
      
      <h2>Water and Hydration</h2>
      <p>Proper hydration is critical for feline health:</p>
      <ul>
        <li>Cats naturally have a low thirst drive</li>
        <li>Wet food provides significant moisture (70-80%)</li>
        <li>Dry food contains only 6-10% moisture</li>
        <li>Multiple water sources can encourage drinking</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Understanding the unique nutritional needs of cats is essential for providing a diet that supports optimal health. Consult with your veterinarian to develop a feeding plan tailored to your cat's specific needs based on age, weight, activity level, and health status.</p>
    `,
    featured_image: '/images/articles/cat-nutrition.jpg',
    category_id: 9,
    author_id: 3,
    is_featured: true,
    published_at: '2024-06-18T11:15:00',
    created_at: '2024-06-17T13:40:00',
    updated_at: '2024-06-17T13:40:00',
    category: {
      id: 9,
      name: 'Cats',
      slug: 'cats'
    },
    author: {
      id: 3,
      full_name: 'Dr. Pet Care Expert',
      avatar: '/images/users/pet-expert.jpg'
    }
  },
  {
    id: 6,
    title: 'Horse Colic: Prevention, Symptoms, and Treatment',
    slug: 'horse-colic-guide',
    excerpt: 'A comprehensive guide to understanding and managing colic in horses.',
    content: `
      <h2>Understanding Equine Colic</h2>
      <p>Colic is not a disease itself but a symptom of abdominal pain in horses. It's one of the most common and potentially serious medical conditions in equines, requiring prompt attention.</p>
      
      <h2>Types of Colic</h2>
      <p>There are several types of colic that affect horses:</p>
      <ul>
        <li><strong>Spasmodic Colic:</strong> Caused by intestinal spasms and gas accumulation</li>
        <li><strong>Impaction Colic:</strong> Results from blockage in the intestinal tract</li>
        <li><strong>Sand Colic:</strong> Occurs when horses ingest sand or dirt</li>
        <li><strong>Displacement/Torsion Colic:</strong> Involves twisted intestines, often requiring surgery</li>
        <li><strong>Gas Colic:</strong> Excessive gas buildup in the intestines</li>
      </ul>
      
      <h2>Symptoms of Colic</h2>
      <p>Recognizing the signs of colic early is crucial:</p>
      <ul>
        <li>Pawing at the ground</li>
        <li>Looking at or biting the flank</li>
        <li>Rolling or attempting to roll</li>
        <li>Sweating without exercise</li>
        <li>Decreased or absent gut sounds</li>
        <li>Lack of appetite or interest in water</li>
        <li>Reduced or no manure production</li>
        <li>Elevated heart rate</li>
        <li>Abnormal posture (stretching, standing spread-legged)</li>
      </ul>
      
      <h2>Prevention Strategies</h2>
      <p>Many cases of colic can be prevented through proper management:</p>
      <ul>
        <li>Provide consistent feeding schedule with high-quality forage</li>
        <li>Ensure constant access to clean, fresh water</li>
        <li>Implement gradual feed changes</li>
        <li>Maintain regular parasite control program</li>
        <li>Provide regular exercise</li>
        <li>Minimize stress</li>
        <li>Regular dental care to ensure proper chewing</li>
        <li>Avoid feeding on sandy ground</li>
      </ul>
      
      <h2>Treatment Approaches</h2>
      <p>Treatment varies based on the type and severity of colic:</p>
      <ul>
        <li>Pain management medications</li>
        <li>Walking (for mild cases)</li>
        <li>Fluid therapy</li>
        <li>Nasogastric intubation</li>
        <li>Laxatives or lubricants for impactions</li>
        <li>Surgery for severe cases</li>
      </ul>
      
      <h2>When to Call the Veterinarian</h2>
      <p>Contact your veterinarian immediately if you observe:</p>
      <ul>
        <li>Persistent pain despite walking</li>
        <li>Violent rolling</li>
        <li>Prolonged symptoms (over 30 minutes)</li>
        <li>Elevated heart rate (over 50 beats per minute)</li>
        <li>Abnormal gum color (pale, dark red, or bluish)</li>
        <li>Absence of gut sounds</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Colic is a serious condition that requires prompt attention. Understanding prevention strategies and recognizing early symptoms can significantly improve outcomes. Always have a plan in place for colic emergencies, including your veterinarian's contact information and a transportation plan if referral to a surgical facility becomes necessary.</p>
    `,
    featured_image: '/images/articles/horse-colic.jpg',
    category_id: 7,
    author_id: 2,
    is_featured: false,
    published_at: '2024-06-05T15:20:00',
    created_at: '2024-06-04T11:10:00',
    updated_at: '2024-06-04T11:10:00',
    category: {
      id: 7,
      name: 'Horses',
      slug: 'horses'
    },
    author: {
      id: 2,
      full_name: 'Dr. Livestock Specialist',
      avatar: '/images/users/livestock-specialist.jpg'
    }
  }
];

/**
 * Mock comments
 */
export const mockComments = [
  {
    id: 1,
    content: "This article was incredibly helpful! I've been struggling with my sheep's nutrition and this gave me clear guidelines to follow.",
    article_id: 1,
    user_id: 4,
    created_at: "2024-06-11T14:25:00",
    updated_at: "2024-06-11T14:25:00",
    parent_id: null,
    user: {
      id: 4,
      full_name: "Farmer Johnson",
      avatar: "/images/users/farmer1.jpg"
    }
  },
  {
    id: 2,
    content: "I'm glad you found it helpful! What specific changes are you planning to make to your feeding program?",
    article_id: 1,
    user_id: 1,
    created_at: "2024-06-11T16:40:00",
    updated_at: "2024-06-11T16:40:00",
    parent_id: 1,
    user: {
      id: 1,
      full_name: "Dr. Veterinary Expert",
      avatar: "/images/users/vet-expert.jpg"
    }
  },
  {
    id: 3,
    content: "I'm going to adjust the mineral supplementation and increase the quality of forage. Your section on essential minerals was eye-opening!",
    article_id: 1,
    user_id: 4,
    created_at: "2024-06-12T09:15:00",
    updated_at: "2024-06-12T09:15:00",
    parent_id: 2,
    user: {
      id: 4,
      full_name: "Farmer Johnson",
      avatar: "/images/users/farmer1.jpg"
    }
  },
  {
    id: 4,
    content: "Could you please write a follow-up article about specific parasite control programs for small animals? That would be very valuable.",
    article_id: 1,
    user_id: 5,
    created_at: "2024-06-13T11:30:00",
    updated_at: "2024-06-13T11:30:00",
    parent_id: null,
    user: {
      id: 5,
      full_name: "Rural Veterinarian",
      avatar: "/images/users/vet2.jpg"
    }
  },
  {
    id: 5,
    content: "That's a great suggestion! I'll put that on my list for upcoming articles. Is there any specific parasite you're particularly concerned about?",
    article_id: 1,
    user_id: 1,
    created_at: "2024-06-13T14:45:00",
    updated_at: "2024-06-13T14:45:00",
    parent_id: 4,
    user: {
      id: 1,
      full_name: "Dr. Veterinary Expert",
      avatar: "/images/users/vet-expert.jpg"
    }
  },
  {
    id: 6,
    content: "This vaccination schedule is exactly what I needed for my new cattle operation. Thank you for the clear guidelines!",
    article_id: 2,
    user_id: 6,
    created_at: "2024-06-14T10:20:00",
    updated_at: "2024-06-14T10:20:00",
    parent_id: null,
    user: {
      id: 6,
      full_name: "Cattle Rancher",
      avatar: "/images/users/rancher1.jpg"
    }
  },
  {
    id: 7,
    content: "I've been following a similar schedule for years and it's been very effective at preventing disease outbreaks in my herd.",
    article_id: 2,
    user_id: 7,
    created_at: "2024-06-15T16:05:00",
    updated_at: "2024-06-15T16:05:00",
    parent_id: null,
    user: {
      id: 7,
      full_name: "Experienced Farmer",
      avatar: "/images/users/farmer2.jpg"
    }
  },
  {
    id: 8,
    content: "My dog was recently diagnosed with Lyme disease, and I wish I had read this article sooner. The symptoms were exactly as described here.",
    article_id: 3,
    user_id: 8,
    created_at: "2024-06-16T13:50:00",
    updated_at: "2024-06-16T13:50:00",
    parent_id: null,
    user: {
      id: 8,
      full_name: "Dog Owner",
      avatar: "/images/users/pet-owner1.jpg"
    }
  },
  {
    id: 9,
    content: "I'm sorry to hear about your dog. How is the treatment going? Lyme disease can be challenging but most dogs respond well to antibiotics.",
    article_id: 3,
    user_id: 3,
    created_at: "2024-06-16T15:30:00",
    updated_at: "2024-06-16T15:30:00",
    parent_id: 8,
    user: {
      id: 3,
      full_name: "Dr. Pet Care Expert",
      avatar: "/images/users/pet-expert.jpg"
    }
  },
  {
    id: 10,
    content: "The treatment is going well, thank you. We caught it relatively early thanks to the lameness symptoms. He's on doxycycline and already showing improvement.",
    article_id: 3,
    user_id: 8,
    created_at: "2024-06-17T09:45:00",
    updated_at: "2024-06-17T09:45:00",
    parent_id: 9,
    user: {
      id: 8,
      full_name: "Dog Owner",
      avatar: "/images/users/pet-owner1.jpg"
    }
  }
];

/**
 * Mock users
 */
export const mockUsers = [
  {
    id: 1,
    email: "vet.expert@example.com",
    full_name: "Dr. Veterinary Expert",
    role: "admin",
    bio: "Experienced veterinarian specializing in farm animals with over 15 years of clinical practice.",
    avatar: "/images/users/vet-expert.jpg",
    created_at: "2024-01-01T00:00:00"
  },
  {
    id: 2,
    email: "livestock.specialist@example.com",
    full_name: "Dr. Livestock Specialist",
    role: "author",
    bio: "Livestock specialist with expertise in cattle and horse health management.",
    avatar: "/images/users/livestock-specialist.jpg",
    created_at: "2024-01-15T00:00:00"
  },
  {
    id: 3,
    email: "pet.expert@example.com",
    full_name: "Dr. Pet Care Expert",
    role: "author",
    bio: "Companion animal veterinarian focusing on preventive care and nutrition.",
    avatar: "/images/users/pet-expert.jpg",
    created_at: "2024-02-01T00:00:00"
  },
  {
    id: 4,
    email: "farmer.johnson@example.com",
    full_name: "Farmer Johnson",
    role: "user",
    bio: "Small-scale farmer raising sheep and goats.",
    avatar: "/images/users/farmer1.jpg",
    created_at: "2024-03-10T00:00:00"
  },
  {
    id: 5,
    email: "rural.vet@example.com",
    full_name: "Rural Veterinarian",
    role: "user",
    bio: "Veterinarian serving rural communities with limited access to animal healthcare.",
    avatar: "/images/users/vet2.jpg",
    created_at: "2024-03-15T00:00:00"
  }
];

/**
 * Mock search results
 */
export const mockSearchResults = {
  articles: [
    {
      id: 1,
      title: "Understanding Small Animals Health and Wellness",
      slug: "understanding-small-animals-health",
      excerpt: "A comprehensive guide to maintaining optimal health for small animals.",
      featured_image: "/images/articles/small-animals-health.jpg",
      category_id: 1,
      author_id: 1,
      is_featured: true,
      published_at: "2024-06-10T12:00:00",
      category: {
        id: 1,
        name: "Small Animals",
        slug: "small-animals"
      }
    },
    {
      id: 3,
      title: "Common Diseases in Dogs and Their Symptoms",
      slug: "common-diseases-in-dogs",
      excerpt: "Recognize the signs of common canine diseases to ensure early treatment.",
      featured_image: "/images/articles/dog-diseases.jpg",
      category_id: 8,
      author_id: 3,
      is_featured: false,
      published_at: "2024-06-15T10:45:00",
      category: {
        id: 8,
        name: "Dogs",
        slug: "dogs"
      }
    }
  ],
  categories: [
    {
      id: 1,
      name: "Small Animals",
      slug: "small-animals",
      description: "Information about small animals like sheep, goats, etc.",
      image_url: "/images/categories/small-animals.jpg",
      parent_id: null
    },
    {
      id: 8,
      name: "Dogs",
      slug: "dogs",
      description: "Information about dog health and care",
      image_url: "/images/categories/dogs.jpg",
      parent_id: 3
    }
  ]
};