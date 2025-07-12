---
title: Mermaid
description: Pan and zoon Mermaid diagrams
---

# Mermaid Diagrams Example

## Big diagram

```mermaid
graph TD;
    A[Start] --> B{Initial Check};

    B --> |True| C[Execute Task A1];
    B --> |False| D[Execute Task A2];

    C --> E{Evaluate Condition 1};
    D --> F{Evaluate Condition 2};

    E --> |True| G[Process A1.1];
    E --> |False| H[Process A1.2];
    F --> |True| I[Process A2.1];
    F --> |False| J[Process A2.2];

    G --> K{Decision Point 1};
    H --> L{Decision Point 2};
    I --> M{Decision Point 3};
    J --> N{Decision Point 4};

    K --> |Option 1| O[Action 1A];
    K --> |Option 2| P[Action 1B];
    L --> |Option 1| Q[Action 2A];
    L --> |Option 2| R[Action 2B];
    M --> |Option 1| S[Action 3A];
    M --> |Option 2| T[Action 3B];
    N --> |Option 1| U[Action 4A];
    N --> |Option 2| V[Action 4B];

    O --> W[Follow-up Task A1];
    P --> W;
    Q --> X[Follow-up Task A2];
    R --> X;
    S --> Y[Follow-up Task A3];
    T --> Y;
    U --> Z[Follow-up Task A4];
    V --> Z;

    W --> AA{Final Check 1};
    X --> AB{Final Check 2};
    Y --> AC{Final Check 3};
    Z --> AD{Final Check 4};

    AA --> |Pass| AE[Completion 1];
    AA --> |Fail| AF[Re-evaluate A1];
    AB --> |Pass| AG[Completion 2];
    AB --> |Fail| AH[Re-evaluate A2];
    AC --> |Pass| AI[Completion 3];
    AC --> |Fail| AJ[Re-evaluate A3];
    AD --> |Pass| AK[Completion 4];
    AD --> |Fail| AL[Re-evaluate A4];

    AE --> AM[End];
    AF --> B;
    AG --> AM;
    AH --> B;
    AI --> AM;
    AJ --> B;
    AK --> AM;
    AL --> B;

    Client --> DNS & CDN & lb[Load Balancer]
    lb --> web[Web Server]
    subgraph api
    web --> accounts[Accounts API] & read[Read API]
    memoryCache[Memory Cache]
    end

    accounts --> queue[Queue] --> tes


    subgraph storage
    dbPrimary[(SQL Write Primary)] -.- dbReplica[(SQL Read Replicas)]
    objectStore[(Object Store)]
    end

    subgraph services
    tes[Transaction Extraction Service] --> category[Category Service] & budget[Budget Service] & notif[Notification Service]
    end

    tes --> objectStore
    CDN --> objectStore
    tes --> dbPrimary
    accounts --> dbPrimary & dbReplica
    read --> dbReplica & memoryCache[Memory Cache]
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant web as Web Browser
    participant blog as Blog Service
    participant account as Account Service
    participant mail as Mail Service
    participant db as Storage

    Note over web,db: The user must be logged in to submit blog posts
    web->>+account: Logs in using credentials
    account->>db: Query stored accounts
    db->>account: Respond with query result

    alt Credentials not found
        account->>web: Invalid credentials
    else Credentials found
        account->>-web: Successfully logged in

        Note over web,db: When the user is authenticated, they can now submit new posts
        web->>+blog: Submit new post
        blog->>db: Store post data

        par Notifications
            blog--)mail: Send mail to blog subscribers
            blog--)db: Store in-site notifications
        and Response
            blog-->>-web: Successfully posted
        end
    end
```

## Pan and Zoom disabled

For smaller diagrams, you can disable pan and zoom functionality:

<div className="panzoom-exclude">

```mermaid
sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    Alice-)John: See you later!
```

</div>
