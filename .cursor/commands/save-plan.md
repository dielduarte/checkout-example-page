# Save Plan Command

When I run this command, do the following:

1. **Create a new plan file** in the `plans` folder at the project root (`/plans`). Create the folder if it does not exist.

2. **Choose a filename**: Create a short, descriptive title for the plan (e.g. `add-booking-form.md`, `auth-flow-refactor.md`) and save the file as `plans/<title>.md`. Use lowercase, hyphens for spaces, and a `.md` extension.

3. **Write the file with exactly these two main sections** (use the headings below; copy the structure):

   ```markdown
   # <Plan title – same as filename, human-readable>

   ## Main user prompt

   <Paste here the initial user prompt from this conversation, exactly as the user wrote it. Do not summarize or paraphrase.>

   ## Final plan (AI execution plan)

   <Paste here the full plan you created to execute the user's request: steps, todos, approach, or outline. Preserve formatting (lists, code blocks, etc.).>
   ```

4. **Fill the placeholders**:
   - **Main user prompt**: The very first message or request the user sent in this conversation (the one that led to the plan). Copy it verbatim.
   - **Final plan**: The complete plan you produced (task list, steps, implementation outline, etc.). Include everything that defines how to execute the work.

5. After writing the file, confirm briefly that the plan was saved and give the path (e.g. `plans/add-booking-form.md`).

Do not ask for confirmation before saving; create the file and the `plans` folder as needed.
