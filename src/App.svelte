<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";

  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCy2CnRPSQisQO4JMIUXZs9PlwlPOvCjCA",
    authDomain: "megauno.firebaseapp.com",
    projectId: "megauno",
    storageBucket: "megauno.appspot.com",
    messagingSenderId: "559730893311",
    appId: "1:559730893311:web:8390c5674d6e1bbd9ac7ca",
    measurementId: "G-5GP74FY121"
  };

  firebase.initializeApp(firebaseConfig);

  var provider = new firebase.auth.GoogleAuthProvider();
</script>

<!-- Styles -->
<style>
  :global(body) {
    font-family: "Playfair Display", serif;
  }

  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1,
  em {
    color: #ff3e00;
  }

  hr {
    height: 1px;
    border: none;
    background: rgb(195, 195, 195);
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet" />
</svelte:head>
<main>
  <h1><em>Qwenti</em></h1>

  <!-- 1. 🔥 Firebase App -->
  <FirebaseApp {firebase}>
    <h1>💪🔥 Mode Activated</h1>

    <p>
      <strong>Tip:</strong>
      Open the browser console for development logging.
    </p>

    <!-- 2. 😀 Get the current user -->
    <User let:user let:auth>
      <p>Howdy 😀! User</p>
      <p>User.uid: <em>{user.uid}</em></p>
      <p>User.displayName: <em>{user.displayName}</em></p>

      <button on:click={() => auth.signOut()}>Sign Out</button>

      <div slot="signed-out">
        <button on:click={() => auth.signInAnonymously()}>
          Sign In Anonymously
        </button>

        <button
          on:click={() => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())}>
          Sign In with Google
        </button>
      </div>

      <hr />

      <Collection
        path={'posts/'}
        query={(ref) => ref.orderBy('createdAt')}
        let:data={posts}
        let:ref={postsRef}
        log>
        {#each posts as post}
          <h2>{post.title}</h2>

          <p>
            Document created at
            <em>{new Date(post.createdAt).toLocaleString()}</em>
          </p>
        {/each}
        <span slot="loading">Loading posts...</span>
      </Collection>

      <!-- 3. 📜 Get a Firestore document owned by a user -->
      <Doc path={`posts/${user.uid}`} let:data={post} let:ref={postRef} log>
        <h2>{post.title}</h2>

        <p>
          Document created at
          <em>{new Date(post.createdAt).toLocaleString()}</em>
        </p>

        <span slot="loading">Loading post...</span>
        <span slot="fallback">
          <button
            on:click={() => postRef.set({
                title: '📜 I like Svelte',
                createdAt: Date.now(),
              })}>
            Create Document
          </button>
        </span>

        <!-- 4. 💬 Get all the comments in its subcollection -->

        <h3>Comments</h3>
        <Collection
          path={postRef.collection('comments')}
          query={(ref) => ref.orderBy('createdAt')}
          let:data={comments}
          let:ref={commentsRef}
          log>
          {#if !comments.length}No comments yet...{/if}

          {#each comments as comment}
            <p>
              <!-- ID: <em>{comment.ref.id}</em> -->
            </p>
            <p>
              {comment.text}
              <button on:click={() => comment.ref.delete()}>Delete</button>
            </p>
          {/each}

          <button
            on:click={() => commentsRef.add({
                text: '💬 Me too!',
                createdAt: Date.now(),
              })}>
            Add Comment
          </button>

          <span slot="loading">Loading comments...</span>
        </Collection>
      </Doc>
    </User>
  </FirebaseApp>

  <img
    src="https://scontent-lax3-2.xx.fbcdn.net/v/t1.0-9/129203915_3524080177638843_4233371956712673277_n.jpg?_nc_cat=107&ccb=2&_nc_sid=825194&_nc_ohc=Q4PHsaOxeZcAX8veCsm&_nc_ht=scontent-lax3-2.xx&oh=0e8737f9fbadcccee9de1ed86f70230f&oe=5FF3CAC5"
    alt="fb" />
</main>
