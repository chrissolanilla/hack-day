import os
import subprocess
import tempfile
class Pythond(Score_Module):
    def check_answer(self,log):
        """get the student code, get our inputs to run, get our expected output,
            run the code in a sandbox subprocess, compare outputs
            it gives partial credit for test cases passed"""
            item_id = log.item_id if hasattr(log, "item_id") else log["item_id"]
            question = self.questions[item_id]
            user_code = log.text if hasattr(log, "text") else log["text"]
            #array of test cases with structure of {input: "...", "output": ".."}
            testcases = question["answers"][0]["text"]

            tests_passed = 0

            for testcase in testcases:
                try:
                    output = self.run_code(user_code, testcase["input"], timeout=2)
                    if output.strip() == testcase["output"].strip():
                        tests_passed += 1
                except Exception as e:
                    print("we crashed?")
                    pass

            total = len(testcases)
            if total ==0:
                return 100 #in the case there are no test cases I guess

            score = (tests_passed / total) * 100
            return score


    def run_code(self, code, input_data, timeout=2):
        """run the code in a sandbox subprocess, we could try docker containers or other stuff tho"""
        #makes a temp file to write code
        with tempfile.NamedTemporaryFile("w", suffix=".py", delete=False) as tmp:
            tmp.write(code)
            tmp.flush()
            tmp_name = tmp.name

        try:
            #runs a subprocess to run tmp file
            result = subprocess.run(
                ["python3", tmp_name],
                input=input_data.encode("utf-8"),
                capture_output=True,
                text=True,
                timeout=timeout
            )
            os.remove(tmp_name)

            #if code had a runtime error
            if result.returncode != 0:
                raise Exception("Runtime error: " + result.stderr)
            return result.stdout

        except subprocess.TimeoutExpired:
            # Timed out => raise exception
            os.remove(tmp_name)
            raise Exception("Time Limit Exceeded")

        except Exception as e:
            os.remove(tmp_name)
            raise e
